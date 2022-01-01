import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentDto } from './dto/document-dto';
import { User } from '../common/decorator/user-decorator';
import { Users } from '../../entity/Users';
import { DocumentPaginationQueryParamsDto } from './dto/document-pagination-query-params-dto';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityDto } from '../activities/dto/activity.dto';
import * as moment from 'moment';
import { DocumentCommentDto } from './dto/document-comment-dto';
import { DocumentComment } from '../../entity/DocumentComment';
import { DocumentUniqueQueryParamsDto } from './dto/document-unique-query-params-dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';
import UpdateDocumentDto from './dto/update-document-dto';
import { MemoryTokenService } from '../memory-token/memory-token.service';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly activitiesService: ActivitiesService,
    private readonly filesService: FilesService,
    private readonly memoryTokenService: MemoryTokenService,
  ) {}

  getDocumentActivityDescription(document) {
    return (
      'Documento: ' +
      document.tome +
      ' ' +
      document.folio +
      ' ' +
      moment(document.date).year()
    );
  }

  @Post()
  async create(@Body() documentDto: DocumentDto) {
    const isDateFolioTomeValid = await this.documentsService.isDocumentFolioTomeDateValid(
      documentDto.folio,
      documentDto.tome,
      documentDto.year,
    );
    if (!isDateFolioTomeValid) {
      throw new BadRequestException('folio, tome and date are already in use');
    }
    const document = await this.documentsService.create(documentDto);
    await this.activitiesService.registerCreate(
      new ActivityDto(
        this.getDocumentActivityDescription(document),
        'documents',
        document,
      ),
    );
    return document;
  }

  @Get('pagination')
  async paginate(
    @Query() documentPaginationQueryParamsDto: DocumentPaginationQueryParamsDto,
    @User() user,
  ) {
    const paginateResult = await this.documentsService.paginate(
      documentPaginationQueryParamsDto,
    );
    return {
      ...paginateResult,
      results: await Promise.all(
        paginateResult.results.map(async (document) => {
          return {
            ...document,
            editable: await this.documentsService.isUserAuthorizedToEditDocument(
              user,
              document,
            ),
          };
        }),
      ),
    };
  }

  @Get('documentUnique')
  async documentUnique(
    @Query() documentUniqueQueryParamsDto: DocumentUniqueQueryParamsDto,
  ) {
    return this.documentsService.isDocumentFolioTomeDateValid(
      Number(documentUniqueQueryParamsDto.folio),
      documentUniqueQueryParamsDto.tome,
      Number(documentUniqueQueryParamsDto.year),
      documentUniqueQueryParamsDto.id
        ? Number(documentUniqueQueryParamsDto.id)
        : undefined,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user, @Req() req) {
    const document = await this.documentsService.findOne(+id);
    if (!document) {
      throw new NotFoundException();
    }

    const baseUrl = this.filesService.getFileBaseEndpointUrl(req);
    const token = await this.memoryTokenService.getToken(user.id);
    return {
      ...document,
      documentFiles: document.documentFiles.map((df) => {
        return {
          ...df,
          url: `${baseUrl}/${token}/${df.fileName}`,
        };
      }),
      editable: await this.documentsService.isUserAuthorizedToEditDocument(
        user,
        document,
      ),
    };
  }

  @Post('files/:id')
  @UseInterceptors(
    FilesInterceptor('files', null, {
      limits: {
        fieldNameSize: 1000000,
        fieldSize: 1000000,
      },
    }),
  )
  async addFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    files.forEach((p) => {
      if (!p.originalname.match(/\.(pdf)$/)) {
        throw new BadRequestException(`Incorrect file format. PDF only.`);
      }
    });
    try {
      const savedFiles = await this.filesService.createFiles(files);
      await this.documentsService.saveFiles(id, savedFiles);
      return savedFiles;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
    @User() user: Users,
  ) {
    const document = await this.documentsService.findOne(+id);
    const isEditionValid = await this.documentsService.isUserAuthorizedToEditDocument(
      user,
      document,
    );
    if (!isEditionValid) {
      throw new ForbiddenException();
    }
    const isDateFolioTomeValid = await this.documentsService.isDocumentFolioTomeDateValid(
      updateDocumentDto.folio,
      updateDocumentDto.tome,
      updateDocumentDto.year,
      +id,
    );
    if (!isDateFolioTomeValid) {
      throw new BadRequestException('folio, tome and date are already in use');
    }
    const newDocument = await this.documentsService.update(
      +id,
      updateDocumentDto,
    );
    const toDeleteDocumentFiles = document.documentFiles.filter((dc) => {
      return !newDocument.documentFiles.find((dCer) => dCer.id === dc.id);
    });
    await this.filesService.deleteFilesIfExists(toDeleteDocumentFiles);
    await this.activitiesService.registerUpdate(
      new ActivityDto(
        this.getDocumentActivityDescription(newDocument),
        'documents',
        newDocument,
      ),
    );
    return newDocument;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @User() user) {
    const document = await this.documentsService.findOne(+id);
    const isEditionValid = await this.documentsService.isUserAuthorizedToEditDocument(
      user,
      document,
    );
    if (!isEditionValid) {
      throw new ForbiddenException();
    }
    const newDocument = await this.documentsService.remove(+id);
    await this.activitiesService.registerDelete(
      new ActivityDto(
        this.getDocumentActivityDescription(newDocument),
        'documents',
        newDocument,
      ),
    );
    return newDocument;
  }

  getDocumentCommentActivityDescription(documentComment: DocumentComment) {
    return 'Comentario: ' + documentComment.comment;
  }

  @Post('documentComments/:documentId')
  async createDocumentComment(
    @Param('documentId') documentId: string,
    @Body() documentCommentDto: DocumentCommentDto,
    @User() user,
  ) {
    if (!documentCommentDto.documentId) {
      throw new BadRequestException('Document id is missing');
    }
    const documentComment = await this.documentsService.createDocumentComment(
      documentCommentDto,
      user.id,
    );
    const document = await this.documentsService.findOne(+documentId);
    await this.activitiesService.registerCreate(
      new ActivityDto(
        this.getDocumentCommentActivityDescription(documentComment),
        'documents',
        document,
      ),
    );
    return documentComment;
  }

  @Get('documentComments/:documentId')
  async getDocumentComments(@Param('documentId') documentId: string) {
    return await this.documentsService.findComments(+documentId);
  }

  @Get('documentComments/:documentId/:commentId')
  async getDocumentComment(
    @Param('documentId') documentId: string,
    @Param('commentId') commentId: string,
  ) {
    const documentComment = await this.documentsService.getDocumentComment(
      +commentId,
    );
    if (!documentComment) {
      throw new NotFoundException();
    }
    return documentComment;
  }

  // todo testing
  @Delete('documentComments/:documentId/:commentId')
  async deleteDocumentComment(
    @Param('documentId') documentId: string,
    @Param('commentId') commentId: string,
    @User() user,
  ) {
    const documentComment = await this.documentsService.getDocumentComment(
      +commentId,
    );
    if (documentComment.userId !== user.id) {
      throw new ForbiddenException();
    }
    const deletedDocumentComment = await this.documentsService.deleteDocumentComment(
      +commentId,
    );
    const document = await this.documentsService.findOne(+documentId);
    await this.activitiesService.registerUpdate(
      new ActivityDto(
        this.getDocumentCommentActivityDescription(documentComment),
        'documents',
        document,
      ),
    );
    return deletedDocumentComment;
  }

  @Patch('documentComments/:documentId/:commentId')
  async patchDocumentComment(
    @Param('documentId') documentId: string,
    @Param('commentId') commentId: string,
    @Body() documentCommentDto: DocumentCommentDto,
    @User() user,
  ) {
    const documentComment = await this.documentsService.getDocumentComment(
      +commentId,
    );
    if (documentComment.userId !== user.id) {
      throw new ForbiddenException();
    }
    const patchedDocumentComment = await this.documentsService.patchDocumentComment(
      documentCommentDto,
      +commentId,
    );
    const document = await this.documentsService.findOne(+documentId);
    await this.activitiesService.registerUpdate(
      new ActivityDto(
        this.getDocumentCommentActivityDescription(patchedDocumentComment),
        'documents',
        document,
      ),
    );
    return patchedDocumentComment;
  }
}

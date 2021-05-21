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
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentDto } from './dto/document-dto';
import { User } from '../common/decorator/user-decorator';
import { Users } from '../../entity/Users';
import { DocumentPaginationQueryParamsDto } from './dto/document-pagination-query-params-dto';
import { ActivitiesService } from '../activities/activities.service';
import { ActivityDto } from '../activities/dto/activity.dto';
import * as moment from 'moment';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly documentsService: DocumentsService,
    private readonly activitiesService: ActivitiesService,
  ) {}

  getActivityDescription(document) {
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
      documentDto.date,
    );
    if (!isDateFolioTomeValid) {
      throw new BadRequestException('folio, tome and date are already in use');
    }
    const document = await this.documentsService.create(documentDto);
    await this.activitiesService.registerCreate(
      new ActivityDto(
        this.getActivityDescription(document),
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

  @Get(':id')
  async findOne(@Param('id') id: string, @User() user) {
    const document = await this.documentsService.findOne(+id);
    if (!document) {
      throw new NotFoundException();
    }
    return {
      ...document,
      editable: await this.documentsService.isUserAuthorizedToEditDocument(
        user,
        document,
      ),
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() documentDto: DocumentDto,
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
      documentDto.folio,
      documentDto.tome,
      documentDto.date,
      +id,
    );
    if (!isDateFolioTomeValid) {
      throw new BadRequestException('folio, tome and date are already in use');
    }
    const newDocument = await this.documentsService.update(+id, documentDto);
    await this.activitiesService.registerUpdate(
      new ActivityDto(
        this.getActivityDescription(newDocument),
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
        this.getActivityDescription(newDocument),
        'documents',
        newDocument,
      ),
    );
    return newDocument;
  }
}

import { Users } from './entity/Users';
import { Appointments } from './entity/Appointments';
import { Clients } from './entity/Clients';
import { Grantors } from './entity/Grantors';
import { DocumentGrantor } from './entity/DocumentGrantor';
import { Documents } from './entity/Documents';
import { DocumentAttachment } from './entity/DocumentAttachment';
import { Attachments } from './entity/Attachments';
import { DocumentTypeAttachment } from './entity/DocumentTypeAttachment';
import { DocumentType } from './entity/DocumentType';
import { DocumentTypeOperation } from './entity/DocumentTypeOperation';
import { Operations } from './entity/Operations';
import { DocumentOperation } from './entity/DocumentOperation';
import { DocumentComment } from './entity/DocumentComment';
import { DocumentGroup } from './entity/DocumentGroup';
import { Groups } from './entity/Groups';
import { UserGroup } from './entity/UserGroup';
import { DocumentUser } from './entity/DocumentUser';
import { DocumentStatus } from './entity/DocumentStatus';
import { Rooms } from './entity/Rooms';
import { Roles } from './entity/Roles';

export const Entities = [
  Users,
  Appointments,
  Grantors,
  Clients,
  DocumentGrantor,
  Documents,
  DocumentAttachment,
  Attachments,
  DocumentTypeAttachment,
  DocumentType,
  DocumentTypeOperation,
  Operations,
  DocumentOperation,
  DocumentComment,
  DocumentGroup,
  Groups,
  UserGroup,
  DocumentUser,
  DocumentStatus,
  Rooms,
  Roles,
];

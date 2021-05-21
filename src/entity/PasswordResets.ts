import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Index('password_resets_email_index', ['email'], {})
@Index('password_resets_token_index', ['token'], {})
@Entity('password_resets', { schema: 'monsreal' })
export class PasswordResets {
  @PrimaryColumn('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'token', length: 255 })
  token: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

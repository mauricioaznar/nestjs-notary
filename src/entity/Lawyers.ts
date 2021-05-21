import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentLawyer } from './DocumentLawyer';
import { BaseCustomEntity } from './helpers/BaseCustomEntity';

@Entity('lawyers', { schema: 'monsreal' })
export class Lawyers extends BaseCustomEntity {
  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'lastname', length: 255 })
  lastname: string;

  @Column('varchar', { name: 'fullname', length: 255 })
  fullname: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'phone', length: 255 })
  phone: string;

  @Column('varchar', { name: 'address1', length: 60 })
  address1: string;

  @Column('varchar', { name: 'address2', length: 60 })
  address2: string;

  @Column('varchar', { name: 'country', length: 255 })
  country: string;

  @Column('varchar', { name: 'city', length: 255 })
  city: string;

  @Column('varchar', { name: 'zip_code', length: 255 })
  zipCode: string;

  @OneToMany(() => DocumentLawyer, (documentLawyer) => documentLawyer.lawyer)
  documentLawyers: DocumentLawyer[];
}

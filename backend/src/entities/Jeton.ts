import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Jeton {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  lieuObtention?: string;

  @Column({ nullable: true })
  lieuEchange?: string;

  @Column({ nullable: true })
  rarete?: string;
}

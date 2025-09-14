import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export default class Jeton {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  nom!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lieuObtention?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lieuEchange?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  rarete?: string;
}

@InputType()
export class JetonInput {
  @Field()
  nom!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  lieuObtention?: string;

  @Field({ nullable: true })
  lieuEchange?: string;

  @Field({ nullable: true })
  rarete?: string;
}

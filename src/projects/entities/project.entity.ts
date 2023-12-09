import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Project model' })
export class Project {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'unique id of the project' })
  id: number;

  @Column()
  name: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ type: 'json' })
  tags: string[];
}

import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Tag } from '../../tags/entities/tag.entity';

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

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.projects, { cascade: ['insert'] })
  tags?: Tag[];
}

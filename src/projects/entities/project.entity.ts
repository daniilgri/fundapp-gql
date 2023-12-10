import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { PROJECT_TYPE } from '../../common/enums/project-type.enum';
import { Idea } from '../../common/interfaces/idea.interface';
import { loggerMiddleware } from '../../common/middlewares/logger.middleware';
import { Tag } from '../../tags/entities/tag.entity';

@Entity()
@ObjectType({ implements: () => Idea, description: 'Project model' })
export class Project implements Idea {
  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: 'unique id of the project' })
  id: number;

  @Column()
  @Field({ middleware: [loggerMiddleware] })
  name: string;

  @Column({ default: false })
  approved: boolean;

  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.projects, { cascade: ['insert'] })
  tags?: Tag[];

  @CreateDateColumn()
  createdAt?: Date;

  @Column({ nullable: true })
  type?: PROJECT_TYPE;
}

import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Project model' })
export class Project {
  @Field(() => ID, { description: 'unique id of the project' })
  id: number;
  name: string;
  approved: boolean;
  tags: string[];
}

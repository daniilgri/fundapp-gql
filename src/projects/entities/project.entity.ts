import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Project {
  id: number;
  name: string;
  approved: boolean;
  tags: string[];
}

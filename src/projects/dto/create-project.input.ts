import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @MinLength(2)
  @Field(() => String, { description: 'Project name' })
  name: string;

  tags: string[];
}

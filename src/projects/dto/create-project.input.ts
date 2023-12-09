import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

import { PROJECT_TYPE } from '../../common/enums/project-type.enum';

@InputType()
export class CreateProjectInput {
  @MinLength(2)
  @Field(() => String, { description: 'Project name' })
  name: string;

  tags: string[];

  type: PROJECT_TYPE;
}

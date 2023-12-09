import { ObjectType } from '@nestjs/graphql';

import { Idea } from '../../common/interfaces/idea.interface';

@ObjectType({ implements: () => Idea })
export class Concept implements Idea {
  name: string;
}

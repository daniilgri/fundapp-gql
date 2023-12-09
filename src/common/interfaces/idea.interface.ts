import { Field, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class Idea {
  @Field()
  name: string;
}

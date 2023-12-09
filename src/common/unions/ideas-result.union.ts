import { createUnionType } from '@nestjs/graphql';

import { Concept } from '../../concepts/entities/concept.entity';
import { Project } from '../../projects/entities/project.entity';

export const IdeasResultUnion = createUnionType({
  name: 'IdeasResult',
  types: () => [Project, Concept],
});

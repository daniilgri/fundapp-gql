import { Query, Resolver } from '@nestjs/graphql';

import { IdeasResultUnion } from '../common/unions/ideas-result.union';
import { Concept } from '../concepts/entities/concept.entity';
import { Project } from '../projects/entities/project.entity';

@Resolver()
export class IdeasResolver {
  @Query(() => [IdeasResultUnion], { name: 'ideas' })
  async getAll(): Promise<(typeof IdeasResultUnion)[]> {
    const project = new Project();
    project.id = 1;
    project.name = 'HO';
    project.approved = true;

    const concept = new Concept();
    concept.name = 'Dragun Flight';

    return [concept, project];
  }
}

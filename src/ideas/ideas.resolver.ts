import { Query, Resolver } from '@nestjs/graphql';

import { Idea } from '../common/interfaces/idea.interface';
import { Concept } from '../concept/entities/concept.entity';
import { Project } from '../projects/entities/project.entity';

@Resolver()
export class IdeasResolver {
  @Query(() => [Idea], { name: 'ideas' })
  async getAll() {
    const project = new Project();
    project.id = 1;
    project.name = 'HO';
    project.approved = true;

    const concept = new Concept();
    concept.name = 'Dragun Flight';

    return [concept, project];
  }
}

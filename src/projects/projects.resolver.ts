import { Query, Resolver } from '@nestjs/graphql';

import { Project } from './entities/project.entity';

@Resolver()
export class ProjectsResolver {
  projects: Project[] = [];

  @Query(() => [Project], { name: 'projects' })
  async getAll(): Promise<Project[]> {
    return this.projects;
  }
}

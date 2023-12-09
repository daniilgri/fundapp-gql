import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProjectInput } from './dto/create-project.input';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project], { name: 'projects' })
  async getAll(): Promise<Project[]> {
    return this.projectsService.getAll();
  }

  // TODO: Try to replace ParseIntPipe with auto tranformation
  @Query(() => Project, { name: 'project', nullable: true })
  async get(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.projectsService.get(id);
  }

  @Mutation(() => Project, { name: 'createProject', nullable: true })
  async create(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectsService.create(createProjectInput);
  }
}

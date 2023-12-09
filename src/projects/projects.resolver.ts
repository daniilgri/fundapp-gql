import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

@Resolver()
export class ProjectsResolver {
  constructor(private readonly projectsService: ProjectsService) {}

  @Query(() => [Project], { name: 'projects' })
  async getAll(): Promise<Project[]> {
    return this.projectsService.getAll();
  }

  @Query(() => Project, { name: 'project' })
  async get(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.projectsService.get(id);
  }

  @Mutation(() => Project, { name: 'createProject' })
  async create(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
  ) {
    return this.projectsService.create(createProjectInput);
  }

  @Mutation(() => Project, { name: 'updateProject' })
  async update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
  ) {
    return this.projectsService.update(id, updateProjectInput);
  }

  @Mutation(() => Project, { name: 'removeProject' })
  async remove(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}

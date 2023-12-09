import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ProjectTagsService } from './project-tags.service';
import { Tag } from '../../tags/entities/tag.entity';
import { Project } from '../entities/project.entity';

@Resolver(() => Project)
export class ProjectTagsResolver {
  constructor(private readonly projectTagsService: ProjectTagsService) {}

  @ResolveField('tags', () => [Tag])
  async getAllByProjectId(@Parent() project: Project): Promise<Tag[]> {
    return this.projectTagsService.getAllByProjectId(project.id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { ProjectTagsResolver } from './project-tags/project-tags.resolver';
import { ProjectTagsService } from './project-tags/project-tags.service';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { PubSubModule } from '../pub-sub/pub-sub.module';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tag]), PubSubModule],
  providers: [
    ProjectsResolver,
    ProjectsService,
    ProjectTagsResolver,
    ProjectTagsService,
  ],
})
export class ProjectsModule {}

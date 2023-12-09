import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './entities/project.entity';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Tag])],
  providers: [ProjectsResolver, ProjectsService],
})
export class ProjectsModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tag } from '../../tags/entities/tag.entity';

@Injectable()
export class ProjectTagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
  ) {}

  async getAllByProjectId(id: number): Promise<Tag[]> {
    return this.tagsRepository
      .createQueryBuilder('tag')
      .innerJoin('tag.projects', 'projects', 'projects.id = :projectId', {
        projectId: id,
      })
      .getMany();
  }
}

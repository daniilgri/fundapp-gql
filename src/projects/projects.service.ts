import { Injectable } from '@nestjs/common';

import { CreateProjectInput } from './dto/create-project.input';

@Injectable()
export class ProjectsService {
  async getAll() {
    return [];
  }

  async get(id: number) {
    return null;
  }

  async create(createProjectInput: CreateProjectInput) {
    return null;
  }
}

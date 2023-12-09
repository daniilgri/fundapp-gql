import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';

import { PROJECT_NOT_FOUND } from './constants/error-messages.constant';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async getAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async get(id: number): Promise<Project> {
    try {
      return await this.projectRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundException(PROJECT_NOT_FOUND);
    }
  }

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const project = this.projectRepository.create(createProjectInput);

    return this.projectRepository.save(project);
  }

  async update(
    id: number,
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    const updatedProject = await this.projectRepository.preload({
      id,
      ...updateProjectInput,
    });

    if (!updatedProject) {
      throw new UserInputError(PROJECT_NOT_FOUND);
    }

    return this.projectRepository.save(updatedProject);
  }

  async remove(id: number) {
    const project = await this.get(id);

    return this.projectRepository.remove(project);
  }
}

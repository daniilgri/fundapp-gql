import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';

import { PROJECT_NOT_FOUND } from './constants/error-messages.constant';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async getAll(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  async get(id: number): Promise<Project> {
    try {
      return await this.projectsRepository.findOne({ where: { id } });
    } catch {
      throw new NotFoundException(PROJECT_NOT_FOUND);
    }
  }

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const tags = await Promise.all(
      createProjectInput.tags.map((tag) => this.preloadTagByName(tag)),
    );
    const project = this.projectsRepository.create({
      ...createProjectInput,
      tags,
    });

    return this.projectsRepository.save(project);
  }

  async update(
    id: number,
    updateProjectInput: UpdateProjectInput,
  ): Promise<Project> {
    const tags =
      updateProjectInput.tags &&
      (await Promise.all(
        updateProjectInput.tags.map((tag) => this.preloadTagByName(tag)),
      ));

    const updatedProject = await this.projectsRepository.preload({
      id,
      ...updateProjectInput,
      tags,
    });

    if (!updatedProject) {
      throw new UserInputError(PROJECT_NOT_FOUND);
    }

    return this.projectsRepository.save(updatedProject);
  }

  async remove(id: number): Promise<Project> {
    const project = await this.get(id);

    return this.projectsRepository.remove(project);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const existingFlavor = await this.tagsRepository.findOne({
      where: { name },
    });

    return existingFlavor
      ? existingFlavor
      : this.tagsRepository.create({ name });
  }
}

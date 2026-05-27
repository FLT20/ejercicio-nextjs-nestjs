import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { BaseProjectFormDto } from './dto/base-project-form.dto';
import { ProjectFormType } from './project-form-type.enum';
import { ProjectForm, ProjectFormDocument } from './schemas/project-form.schema';

@Injectable()
export class ProjectFormsService {
  constructor(
    @InjectModel(ProjectForm.name)
    private readonly projectFormModel: Model<ProjectFormDocument>,
  ) {}

  async create<T extends BaseProjectFormDto>(
    formType: ProjectFormType,
    dto: T,
    user: CurrentUserPayload,
  ) {
    const { projectName, applicantName, applicantEmail, summary, ...details } = dto;

    const createdForm = await this.projectFormModel.create({
      formType,
      projectName,
      applicantName,
      applicantEmail: applicantEmail.toLowerCase(),
      summary,
      details,
      submittedBy: new Types.ObjectId(user.id),
      status: 'validated',
    });

    return this.toResponse(createdForm);
  }

  async findAll(formType?: ProjectFormType) {
    const filter: FilterQuery<ProjectFormDocument> = formType ? { formType } : {};
    const forms = await this.projectFormModel.find(filter).sort({ createdAt: -1 }).lean().exec();

    return forms.map((form) => this.toResponse(form));
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Project form not found');
    }

    const form = await this.projectFormModel.findById(id).lean().exec();

    if (!form) {
      throw new NotFoundException('Project form not found');
    }

    return this.toResponse(form);
  }

  private toResponse(form: any) {
    return {
      id: form._id.toString(),
      formType: form.formType,
      projectName: form.projectName,
      applicantName: form.applicantName,
      applicantEmail: form.applicantEmail,
      summary: form.summary,
      details: form.details,
      status: form.status,
      submittedBy: form.submittedBy?.toString(),
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    };
  }
}

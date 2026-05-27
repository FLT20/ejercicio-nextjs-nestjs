import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ProjectFormType } from '../project-form-type.enum';

export type ProjectFormDocument = HydratedDocument<ProjectForm>;

@Schema({ timestamps: true, versionKey: false, collection: 'project_forms' })
export class ProjectForm {
  @Prop({ required: true, enum: ProjectFormType, index: true })
  formType!: ProjectFormType;

  @Prop({ required: true, trim: true })
  projectName!: string;

  @Prop({ required: true, trim: true })
  applicantName!: string;

  @Prop({ required: true, lowercase: true, trim: true })
  applicantEmail!: string;

  @Prop({ required: true, trim: true, minlength: 20 })
  summary!: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  details!: Record<string, unknown>;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User', index: true })
  submittedBy!: Types.ObjectId;

  @Prop({ required: true, enum: ['received', 'validated'], default: 'validated' })
  status!: 'received' | 'validated';
}

export const ProjectFormSchema = SchemaFactory.createForClass(ProjectForm);
ProjectFormSchema.index({ formType: 1, createdAt: -1 });
ProjectFormSchema.index({ applicantEmail: 1, createdAt: -1 });

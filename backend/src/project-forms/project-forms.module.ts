import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectFormsController } from './project-forms.controller';
import { ProjectFormsService } from './project-forms.service';
import { ProjectForm, ProjectFormSchema } from './schemas/project-form.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProjectForm.name, schema: ProjectFormSchema }])],
  controllers: [ProjectFormsController],
  providers: [ProjectFormsService],
})
export class ProjectFormsModule {}

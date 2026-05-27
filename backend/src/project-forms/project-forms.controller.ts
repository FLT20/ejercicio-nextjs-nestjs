import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateEcommerceProjectDto } from './dto/create-ecommerce-project.dto';
import { CreateInfrastructureProjectDto } from './dto/create-infrastructure-project.dto';
import { CreateResearchProjectDto } from './dto/create-research-project.dto';
import { CreateSoftwareProjectDto } from './dto/create-software-project.dto';
import { ProjectFormType } from './project-form-type.enum';
import { ProjectFormsService } from './project-forms.service';

@Controller('project-forms')
@UseGuards(JwtAuthGuard)
export class ProjectFormsController {
  constructor(private readonly projectFormsService: ProjectFormsService) {}

  @Post('software')
  createSoftware(@Body() dto: CreateSoftwareProjectDto, @CurrentUser() user: CurrentUserPayload) {
    return this.projectFormsService.create(ProjectFormType.Software, dto, user);
  }

  @Post('ecommerce')
  createEcommerce(@Body() dto: CreateEcommerceProjectDto, @CurrentUser() user: CurrentUserPayload) {
    return this.projectFormsService.create(ProjectFormType.Ecommerce, dto, user);
  }

  @Post('research')
  createResearch(@Body() dto: CreateResearchProjectDto, @CurrentUser() user: CurrentUserPayload) {
    return this.projectFormsService.create(ProjectFormType.Research, dto, user);
  }

  @Post('infrastructure')
  createInfrastructure(
    @Body() dto: CreateInfrastructureProjectDto,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return this.projectFormsService.create(ProjectFormType.Infrastructure, dto, user);
  }

  @Get()
  findAll(@Query('type') type?: ProjectFormType) {
    return this.projectFormsService.findAll(type);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectFormsService.findOne(id);
  }
}

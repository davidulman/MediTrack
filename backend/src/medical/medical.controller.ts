import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MedicalService } from './medical.service';
import { CreateMedicalDto } from './dto/create-medical.dto';
import { UpdateMedicalDto } from './dto/update-medical.dto';
import { RequestWithUser } from 'src/auth/types/requestWithUser.type';
import { Public } from 'src/decorator/public.decorator';

@Controller('medical-history')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Post()
  create(
    @Body() createMedicalDto: CreateMedicalDto,
    @Req() req: RequestWithUser,
  ) {
    const sub = req.user.sub;
    return this.medicalService.create(createMedicalDto, sub);
  }

  @Get()
  findAll(@Req() req: RequestWithUser) {
    const sub = req.user.sub;
    return this.medicalService.findAll(sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
    const sub = req.user.sub;
    return this.medicalService.findOne(id, sub);
  }

  @Public()
  @Get(':id/:token')
  findOneShared(@Param('id') id: string, @Param('token') token: string) {
    return this.medicalService.findOneShared(id, token);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalDto: UpdateMedicalDto,
    @Req() req: RequestWithUser,
  ) {
    const sub = req.user.sub;
    return this.medicalService.update(id, updateMedicalDto, sub);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    const sub = req.user.sub;
    return this.medicalService.remove(id, sub);
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicalDto } from './dto/create-medical.dto';
import { UpdateMedicalDto } from './dto/update-medical.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Medical, MedicalDocument } from './schema/medical.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MedicalService {
  constructor(
    @InjectModel(Medical.name)
    private readonly medicalModel: Model<MedicalDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createMedicalDto: CreateMedicalDto, user: string) {
    try {
      const { isShared } = createMedicalDto;
      const create = await this.medicalModel.create({
        ...createMedicalDto,
        user,
        shareToken: isShared ? this.generateShareToken(user) : null,
      });
      return create;
    } catch (error) {
      throw new BadRequestException('Error creating medical history');
    }
  }

  async findAll(user: string) {
    try {
      return await this.medicalModel.find({ user });
    } catch (error) {
      throw new BadRequestException('Error fetching medical history');
    }
  }

  async findOne(id: string, user: string) {
    try {
      return await this.medicalModel.findOne({ _id: id, user });
    } catch (error) {
      throw new BadRequestException('Error fetching medical history');
    }
  }

  async findOneShared(id: string, token: string) {
    try {
      return await this.medicalModel.findOne({
        _id: id,
        shareToken: token,
        isShared: true,
      });
    } catch (error) {
      throw new BadRequestException('Error fetching medical history');
    }
  }

  async update(id: string, updateMedicalDto: UpdateMedicalDto, user: string) {
    const { isShared } = updateMedicalDto;
    try {
      return await this.medicalModel.findOneAndUpdate(
        { _id: id, user },
        {
          ...updateMedicalDto,
          shareToken: isShared ? this.generateShareToken(user) : null,
        },
        { new: true },
      );
    } catch (error) {
      throw new BadRequestException('Error updating medical history');
    }
  }

  async remove(id: string, user: string) {
    try {
      return await this.medicalModel.deleteOne({ _id: id, user });
    } catch (error) {
      throw new BadRequestException('Error deleting medical history');
    }
  }

  generateShareToken(id: string) {
    try {
      const shareToken = this.jwtService.sign(
        { sub: id },
        {
          secret: process.env.JWT_SHARE_TOKEN_SECRET,
          expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        },
      );
      return shareToken;
    } catch (error) {
      throw new BadRequestException('Error generating share token');
    }
  }
}

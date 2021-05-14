import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetIdUserDto, GetUserDto } from './dtos/get-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<GetIdUserDto> {
    const createdUser = await this.userModel.create({ ...createUserDto });
    return {
      id: createdUser._id,
    };
  }

  async getAll(): Promise<GetUserDto[]> {
    const users = await this.userModel.find().lean();
    return users.map((user) => {
      return {
        id: user._id,
        ci: user.ci,
        name: user.name,
        lastname: user.lastname,
        address: user.address,
        bornDate: user.bornDate,
        studyCareer: user.studyCareer,
      };
    });
  }

  async getById(id: string): Promise<GetUserDto> {
    const user = await this.userModel.findById(id).lean();
    return {
      id: user._id,
      ci: user.ci,
      name: user.name,
      lastname: user.lastname,
      address: user.address,
      bornDate: user.bornDate,
      studyCareer: user.studyCareer,
    };
  }

  async updateById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GetIdUserDto> {
    await this.userModel.updateOne({ _id: id }, updateUserDto);
    return {
      id,
    };
  }
}

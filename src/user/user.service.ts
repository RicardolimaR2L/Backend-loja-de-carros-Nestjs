import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import * as CryptoJS from 'crypto-js';
import { UserMessagehelper } from './helpers/message.helpers';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) { }
  private logger = new Logger(UserService.name)//instancia dos loggs

  async createUser(dto: RegisterUserDto) {
    this.logger.debug('register - started');
    dto.password = CryptoJS.AES.encrypt(dto.password,//encrypt, criptografa a senha do usuario.
      process.env.USER_CYPHER_SECRET_KEY,).toString();
    const createdUser = new this.UserModel(dto);
    await createdUser.save();
  }

  async getUserByLoginPassword(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.UserModel.findOne({ email }) as UserDocument;
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.USER_CYPHER_SECRET_KEY); //Retorna a senha descriptografada ainda em bytes
      const savedPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (password === savedPassword) {
        return user;
      }
    }
    return null;
  }

  async findUser() {
    this.logger.debug('findUsers - started');
    return await this.UserModel.find();
  }
  async findUserById(id:any) {
    this.logger.debug('findUserById - started');
    return await this.UserModel.findById(id);
  }


  async updateUser(id: string, dto: UpdateUserDto){
    this.logger.debug('UpdateUser - started');
    if(!id){
      throw new BadRequestException(UserMessagehelper.UPDATE_USER_FAILS)
    }
    return await this.UserModel.findByIdAndUpdate(id, dto);
  }

  async RemoveUser(id: string) {
    this.logger.debug('DeleteUser - started');
    return await this.UserModel.findByIdAndDelete(
      { _id: id }
    ).exec();
  }

  
  async existsByEmail(email: string) {
    const result = await this.UserModel.findOne({ email });
    if (result) {
      return true;
    }
    return false;
  }
  
}


import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileValidatorsPipe } from '../common/pipes/parseFile.pipe';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { AvatarService } from './avatar.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/users/entities/user.entity';
import { CustomImageInterceptor } from 'src/common/interceptors/image.interceptor';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}

  @Post()
  @Auth()
  @CustomImageInterceptor('file')
  create(
    @UploadedFile(FileValidatorsPipe)
    file: Express.Multer.File,
    @Body() createAvatarDto: CreateAvatarDto,
    @GetUser() user: User,
  ) {
    createAvatarDto;
    return this.avatarService.create(file, user);
  }
}

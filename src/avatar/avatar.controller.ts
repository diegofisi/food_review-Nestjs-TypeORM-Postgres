import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CustomImageInterceptor } from './decorators/avatarInterceptor.decorator';
import { FileValidatorsPipe } from './pipes/parseFile.pipe';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { AvatarService } from './avatar.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/users/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}
  @Post()
  @Auth()
  @CustomImageInterceptor('files')
  uploadImage(
    @UploadedFiles(FileValidatorsPipe)
    files: Express.Multer.File[],
    @Body() createAvatarDto: CreateAvatarDto,
    @GetUser() user: User,
  ) {
    createAvatarDto;
    return this.avatarService.create(files, user);
  }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.avatarService.findAll(user);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.avatarService.findOne(+id);
  // }
  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) idAvatar, @GetUser() user: User) {
    return this.avatarService.remove(idAvatar);
  }
}

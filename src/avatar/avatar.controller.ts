import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileValidatorsPipe } from '../common/pipes/parseFile.pipe';
import { CreateAvatarDto } from './dto/create-avatar.dto';
import { AvatarService } from './avatar.service';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/auth/users/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CustomImagesInterceptor } from 'src/common/interceptors/images.interceptor';
import { CustomImageInterceptor } from 'src/common/interceptors/image.interceptor';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}
  // @Post('upload')
  // @Auth()
  // @CustomImagesInterceptor('files')
  // uploadImage(
  //   @UploadedFiles(FileValidatorsPipe)
  //   files: Express.Multer.File[],
  //   @Body() createAvatarDto: CreateAvatarDto,
  //   @GetUser() user: User,
  // ) {
  //   createAvatarDto;
  //   return this.avatarService.create2(files, user);
  // }

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

  // @Get()
  // @Auth(ValidRoles.admin, ValidRoles.superUser)
  // findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
  //   return this.avatarService.findAll(paginationDto, user);
  // }

  @Patch(':id')
  @Auth()
  update(@Param('id', ParseUUIDPipe) idAvatar, @GetUser() user: User) {
    return this.avatarService.update(idAvatar, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id', ParseUUIDPipe) idAvatar, @GetUser() user: User) {
    return this.avatarService.remove(idAvatar, user);
  }
}

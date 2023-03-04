import { Controller, Get, Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  @Auth(ValidRoles.admin, ValidRoles.superUser)
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PigsService, MockPig } from './pigs.service';
import { CreatePigDto } from './dto/create-pig.dto';
import { UpdatePigDto } from './dto/update-pig.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@Controller('pigs')
@UseGuards(JwtAuthGuard)
export class PigsController {
  constructor(private readonly pigsService: PigsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  create(@Body() createPigDto: CreatePigDto): MockPig {
    return this.pigsService.create(createPigDto);
  }

  @Get()
  findAll(@Query('status') status?: string, @Query('batch') batchId?: string): MockPig[] {
    if (status) {
      return this.pigsService.findByStatus(status);
    }
    if (batchId) {
      return this.pigsService.findByBatch(batchId);
    }
    return this.pigsService.findAll();
  }

  @Get('statistics')
  getStatistics(): any {
    return this.pigsService.getStatistics();
  }

  @Get('tag/:tagId')
  findByTagId(@Param('tagId') tagId: string): MockPig {
    return this.pigsService.findByTagId(tagId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): MockPig {
    return this.pigsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VET)
  update(@Param('id') id: string, @Body() updatePigDto: UpdatePigDto): MockPig {
    return this.pigsService.update(id, updatePigDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string): { message: string; pig: MockPig } {
    return this.pigsService.remove(id);
  }
}

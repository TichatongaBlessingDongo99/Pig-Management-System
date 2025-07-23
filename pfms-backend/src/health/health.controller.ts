import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('health')
@ApiBearerAuth()
@Controller('health')
@UseGuards(JwtAuthGuard)
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VET)
  @ApiOperation({ summary: 'Create a new health record' })
  @ApiResponse({ status: 201, description: 'Health record created successfully' })
  create(@Body() createHealthDto: CreateHealthDto) {
    return this.healthService.create(createHealthDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all health records' })
  @ApiResponse({ status: 200, description: 'List of all health records' })
  findAll(@Query('pig_id') pig_id?: string, @Query('status') status?: string) {
    if (pig_id) {
      return this.healthService.findByPig(pig_id);
    }
    if (status) {
      return this.healthService.findByStatus(status);
    }
    return this.healthService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a health record by ID' })
  @ApiResponse({ status: 200, description: 'Health record details' })
  @ApiResponse({ status: 404, description: 'Health record not found' })
  findOne(@Param('id') id: string) {
    return this.healthService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VET)
  @ApiOperation({ summary: 'Update a health record' })
  @ApiResponse({ status: 200, description: 'Health record updated successfully' })
  @ApiResponse({ status: 404, description: 'Health record not found' })
  update(@Param('id') id: string, @Body() updateHealthDto: UpdateHealthDto) {
    return this.healthService.update(id, updateHealthDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VET)
  @ApiOperation({ summary: 'Delete a health record' })
  @ApiResponse({ status: 200, description: 'Health record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Health record not found' })
  remove(@Param('id') id: string) {
    return this.healthService.remove(id);
  }
}

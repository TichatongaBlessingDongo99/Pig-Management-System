import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PenService } from './pen.service';
import { CreatePenDto } from './dto/create-pen.dto';
import { UpdatePenDto } from './dto/update-pen.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('pens')
@ApiBearerAuth()
@Controller('pens')
@UseGuards(JwtAuthGuard)
export class PenController {
  constructor(private readonly penService: PenService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create a new pen' })
  @ApiResponse({ status: 201, description: 'Pen created successfully' })
  create(@Body() createPenDto: CreatePenDto) {
    return this.penService.create(createPenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pens' })
  @ApiResponse({ status: 200, description: 'List of all pens' })
  findAll(@Query('farm_id') farm_id?: string, @Query('available') available?: string) {
    if (available === 'true') {
      return this.penService.findAvailable();
    }
    if (farm_id) {
      return this.penService.findByFarm(farm_id);
    }
    return this.penService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pen by ID' })
  @ApiResponse({ status: 200, description: 'Pen details' })
  @ApiResponse({ status: 404, description: 'Pen not found' })
  findOne(@Param('id') id: string) {
    return this.penService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update a pen' })
  @ApiResponse({ status: 200, description: 'Pen updated successfully' })
  @ApiResponse({ status: 404, description: 'Pen not found' })
  update(@Param('id') id: string, @Body() updatePenDto: UpdatePenDto) {
    return this.penService.update(id, updatePenDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a pen' })
  @ApiResponse({ status: 200, description: 'Pen deleted successfully' })
  @ApiResponse({ status: 404, description: 'Pen not found' })
  remove(@Param('id') id: string) {
    return this.penService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { FeedingService } from './feeding.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('feeding')
@ApiBearerAuth()
@Controller('feeding')
@UseGuards(JwtAuthGuard)
export class FeedingController {
  constructor(private readonly feedingService: FeedingService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.WORKER)
  @ApiOperation({ summary: 'Create a new feeding record' })
  @ApiResponse({ status: 201, description: 'Feeding record created successfully' })
  create(@Body() createFeedingDto: CreateFeedingDto) {
    return this.feedingService.create(createFeedingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feeding records' })
  @ApiResponse({ status: 200, description: 'List of all feeding records' })
  findAll(
    @Query('pig_id') pig_id?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    if (pig_id) {
      return this.feedingService.findByPig(pig_id);
    }
    if (startDate && endDate) {
      return this.feedingService.findByDateRange(new Date(startDate), new Date(endDate));
    }
    return this.feedingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a feeding record by ID' })
  @ApiResponse({ status: 200, description: 'Feeding record details' })
  @ApiResponse({ status: 404, description: 'Feeding record not found' })
  findOne(@Param('id') id: string) {
    return this.feedingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.WORKER)
  @ApiOperation({ summary: 'Update a feeding record' })
  @ApiResponse({ status: 200, description: 'Feeding record updated successfully' })
  @ApiResponse({ status: 404, description: 'Feeding record not found' })
  update(@Param('id') id: string, @Body() updateFeedingDto: UpdateFeedingDto) {
    return this.feedingService.update(id, updateFeedingDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Delete a feeding record' })
  @ApiResponse({ status: 200, description: 'Feeding record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Feeding record not found' })
  remove(@Param('id') id: string) {
    return this.feedingService.remove(id);
  }
}

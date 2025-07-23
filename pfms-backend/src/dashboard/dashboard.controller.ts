import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../entities/user.entity';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get dashboard overview with key metrics' })
  @ApiResponse({ status: 200, description: 'Dashboard overview data' })
  getOverview() {
    return this.dashboardService.getOverview();
  }

  @Get('health-stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VET)
  @ApiOperation({ summary: 'Get health statistics' })
  @ApiResponse({ status: 200, description: 'Health statistics data' })
  getHealthStats() {
    return this.dashboardService.getHealthStats();
  }

  @Get('feeding-stats')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Get feeding statistics and costs' })
  @ApiResponse({ status: 200, description: 'Feeding statistics data' })
  getFeedingStats() {
    return this.dashboardService.getFeedingStats();
  }

  @Get('pen-utilization')
  @ApiOperation({ summary: 'Get pen utilization data' })
  @ApiResponse({ status: 200, description: 'Pen utilization statistics' })
  getPenUtilization() {
    return this.dashboardService.getPenUtilization();
  }

  @Get('recent-activity')
  @ApiOperation({ summary: 'Get recent farm activities' })
  @ApiResponse({ status: 200, description: 'Recent activity data' })
  getRecentActivity() {
    return this.dashboardService.getRecentActivity();
  }
}

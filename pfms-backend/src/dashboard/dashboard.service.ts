import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pig } from '../entities/pig.entity';
import { Farm } from '../entities/farm.entity';
import { Batch } from '../entities/batch.entity';
import { Pen } from '../entities/pen.entity';
import { Health } from '../entities/health.entity';
import { FeedingLog } from '../entities/feeding-log.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Pig)
    private pigRepository: Repository<Pig>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Batch)
    private batchRepository: Repository<Batch>,
    @InjectRepository(Pen)
    private penRepository: Repository<Pen>,
    @InjectRepository(Health)
    private healthRepository: Repository<Health>,
    @InjectRepository(FeedingLog)
    private feedingRepository: Repository<FeedingLog>,
  ) {}

  async getOverview() {
    const [totalPigs, totalFarms, totalBatches, totalPens] = await Promise.all([
      this.pigRepository.count(),
      this.farmRepository.count(),
      this.batchRepository.count(),
      this.penRepository.count(),
    ]);

    const pigsByStatus = await this.pigRepository
      .createQueryBuilder('pig')
      .select('pig.status', 'status')
      .addSelect('COUNT(pig.id)', 'count')
      .groupBy('pig.status')
      .getRawMany();

    return {
      totals: {
        pigs: totalPigs,
        farms: totalFarms,
        batches: totalBatches,
        pens: totalPens,
      },
      pigsByStatus: pigsByStatus.reduce((acc, item) => {
        acc[item.status] = parseInt(item.count);
        return acc;
      }, {}),
    };
  }

  async getHealthStats() {
    const healthStats = await this.healthRepository
      .createQueryBuilder('health')
      .select('health.health_status', 'status')
      .addSelect('COUNT(DISTINCT health.pig)', 'count')
      .groupBy('health.health_status')
      .getRawMany();

    const recentHealthChecks = await this.healthRepository.find({
      take: 10,
      order: { examination_date: 'DESC' },
      relations: ['pig'],
    });

    return {
      statusDistribution: healthStats.reduce((acc, item) => {
        acc[item.status] = parseInt(item.count);
        return acc;
      }, {}),
      recentChecks: recentHealthChecks,
    };
  }

  async getFeedingStats() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const totalFeedCost = await this.feedingRepository
      .createQueryBuilder('feeding')
      .select('SUM(feeding.cost_per_kg * feeding.quantity_kg)', 'total')
      .where('feeding.feeding_date >= :date', { date: thirtyDaysAgo })
      .getRawOne();

    const totalFeedQuantity = await this.feedingRepository
      .createQueryBuilder('feeding')
      .select('SUM(feeding.quantity_kg)', 'total')
      .where('feeding.feeding_date >= :date', { date: thirtyDaysAgo })
      .getRawOne();

    const feedingsByType = await this.feedingRepository
      .createQueryBuilder('feeding')
      .select('feeding.feed_type', 'type')
      .addSelect('SUM(feeding.quantity_kg)', 'quantity')
      .addSelect('SUM(feeding.cost_per_kg * feeding.quantity_kg)', 'cost')
      .where('feeding.feeding_date >= :date', { date: thirtyDaysAgo })
      .groupBy('feeding.feed_type')
      .getRawMany();

    return {
      last30Days: {
        totalCost: parseFloat(totalFeedCost.total) || 0,
        totalQuantity: parseFloat(totalFeedQuantity.total) || 0,
      },
      byFeedType: feedingsByType.map(item => ({
        type: item.type,
        quantity: parseFloat(item.quantity) || 0,
        cost: parseFloat(item.cost) || 0,
      })),
    };
  }

  async getPenUtilization() {
    const penStats = await this.penRepository
      .createQueryBuilder('pen')
      .leftJoin('pen.pigs', 'pig')
      .select('pen.id', 'penId')
      .addSelect('pen.pen_number', 'penNumber')
      .addSelect('pen.capacity', 'capacity')
      .addSelect('COUNT(pig.id)', 'currentOccupancy')
      .groupBy('pen.id')
      .addGroupBy('pen.pen_number')
      .addGroupBy('pen.capacity')
      .getRawMany();

    return penStats.map(pen => ({
      penId: pen.penId,
      penNumber: pen.penNumber,
      capacity: parseInt(pen.capacity),
      currentOccupancy: parseInt(pen.currentOccupancy),
      utilizationRate: (parseInt(pen.currentOccupancy) / parseInt(pen.capacity)) * 100,
    }));
  }

  async getRecentActivity() {
    const recentFeedings = await this.feedingRepository.find({
      take: 5,
      order: { feeding_date: 'DESC' },
      relations: ['pig'],
    });

    const recentHealthChecks = await this.healthRepository.find({
      take: 5,
      order: { examination_date: 'DESC' },
      relations: ['pig'],
    });

    return {
      recentFeedings: recentFeedings.map(f => ({
        id: f.id,
        pigId: f.pig.id,
        pigTag: f.pig.tag_id,
        date: f.feeding_date,
        feedType: f.feed_type,
        quantity: f.quantity_kg,
      })),
      recentHealthChecks: recentHealthChecks.map(h => ({
        id: h.id,
        pigId: h.pig.id,
        pigTag: h.pig.tag_id,
        date: h.examination_date,
        status: h.health_status,
        treatment: h.treatment,
      })),
    };
  }
}

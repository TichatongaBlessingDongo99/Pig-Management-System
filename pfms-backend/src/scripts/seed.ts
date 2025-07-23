import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { FarmsService } from '../farms/farms.service';
import { PigsService } from '../pigs/pigs.service';
import { BatchService } from '../batch/batch.service';
import { PenService } from '../pens/pen.service';
import { HealthService } from '../health/health.service';
import { FeedingService } from '../feeding/feeding.service';
import { PenType } from '../entities/pen.entity';
import { HealthStatus } from '../entities/health.entity';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  const app = await NestFactory.createApplicationContext(AppModule);

  const farmsService = app.get(FarmsService);
  const pigsService = app.get(PigsService);
  const batchService = app.get(BatchService);
  const penService = app.get(PenService);
  const healthService = app.get(HealthService);
  const feedingService = app.get(FeedingService);

  try {
    // Create sample farms
    console.log('Creating sample farms...');
    const farm1 = await farmsService.create({
      name: 'Green Valley Pig Farm',
      location: 'Rural District, Agricultural Zone',
      contact_info: 'contact@greenvalley.com | +1-555-0123',
    });

    const farm2 = await farmsService.create({
      name: 'Sunrise Swine Ranch',
      location: 'Northern Agricultural District',
      contact_info: 'info@sunriseranch.com | +1-555-0456',
    });

    // Create sample pens
    console.log('Creating sample pens...');
    const pen1 = await penService.create({
      pen_number: 'PEN-001',
      pen_type: PenType.FARROWING,
      capacity: 10,
      farm_id: farm1.id,
      location: 'Building A, Section 1',
      notes: 'Climate controlled farrowing pen',
    });

    const pen2 = await penService.create({
      pen_number: 'PEN-002',
      pen_type: PenType.NURSERY,
      capacity: 15,
      farm_id: farm1.id,
      location: 'Building A, Section 2',
      notes: 'Nursery pen for young piglets',
    });

    const pen3 = await penService.create({
      pen_number: 'PEN-003',
      pen_type: PenType.GROWING,
      capacity: 20,
      farm_id: farm2.id,
      location: 'Building B, Section 1',
      notes: 'Growing pen for adolescent pigs',
    });

    // Create sample batches
    console.log('Creating sample batches...');
    const batch1 = await batchService.create({
      batch_number: 'BATCH-2024-001',
      breed: 'Yorkshire',
      farm_id: farm1.id,
      start_date: new Date('2024-01-15'),
      notes: 'High-quality Yorkshire breeding stock',
    });

    const batch2 = await batchService.create({
      batch_number: 'BATCH-2024-002',
      breed: 'Duroc',
      farm_id: farm2.id,
      start_date: new Date('2024-02-01'),
      notes: 'Premium Duroc breeding program',
    });

    // Create sample pigs
    console.log('Creating sample pigs...');
    const pig1 = await pigsService.create({
      tag_id: 'PIG-001',
      sex: 'female',
      breed: 'Yorkshire',
      date_of_birth: '2024-02-15',
      weight: 85.5,
      status: 'alive',
      batch_id: batch1.id,
      current_pen_id: pen1.id,
    });

    const pig2 = await pigsService.create({
      tag_id: 'PIG-002',
      sex: 'male',
      breed: 'Yorkshire',
      date_of_birth: '2024-02-20',
      weight: 92.3,
      status: 'alive',
      batch_id: batch1.id,
      current_pen_id: pen2.id,
    });

    const pig3 = await pigsService.create({
      tag_id: 'PIG-003',
      rfid_tag: 'RFID-003',
      sex: 'female',
      breed: 'Hampshire',
      date_of_birth: '2024-02-10',
      weight: 78.9,
      status: 'alive',
      batch_id: batch1.id,
      current_pen_id: pen2.id,
    });

    // Create sample health records
    console.log('Creating sample health records...');
    await healthService.create({
      pig_id: pig1.id,
      examination_date: new Date('2024-07-20'),
      health_status: HealthStatus.HEALTHY,
      weight: 85.5,
      temperature: 38.5,
      veterinarian: 'Dr. Smith',
      notes: 'Regular health checkup - all good',
    });

    await healthService.create({
      pig_id: pig2.id,
      examination_date: new Date('2024-07-21'),
      health_status: HealthStatus.HEALTHY,
      weight: 92.3,
      treatment: 'Swine flu vaccination',
      veterinarian: 'Dr. Johnson',
      notes: 'Annual vaccination completed',
    });

    // Create sample feeding records
    console.log('Creating sample feeding records...');
    await feedingService.create({
      pig_id: pig1.id,
      feeding_date: new Date('2024-07-23'),
      feed_type: 'Grower Feed',
      quantity_kg: 2.5,
      cost_per_kg: 6.00,
      notes: 'Regular morning feeding',
    });

    await feedingService.create({
      pig_id: pig2.id,
      feeding_date: new Date('2024-07-23'),
      feed_type: 'Finisher Feed',
      quantity_kg: 3.0,
      cost_per_kg: 6.00,
      notes: 'High protein finisher feed',
    });

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Sample data created:');
    console.log(`- ${2} Farms`);
    console.log(`- ${3} Pens`);
    console.log(`- ${2} Batches`);
    console.log(`- ${3} Pigs`);
    console.log(`- ${2} Health records`);
    console.log(`- ${2} Feeding records`);
    console.log('\n🌐 You can now access the API at: http://localhost:3000/api');
    console.log('📚 API Documentation: http://localhost:3000/api/docs');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await app.close();
  }
}

seedDatabase();

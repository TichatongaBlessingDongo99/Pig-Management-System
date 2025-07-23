import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePigDto } from './dto/create-pig.dto';
import { UpdatePigDto } from './dto/update-pig.dto';

// Mock data for development
const mockPigs = [
  {
    id: '1',
    tag_id: 'PIG001',
    rfid_tag: 'RFID001',
    sex: 'female',
    breed: 'Yorkshire',
    date_of_birth: '2024-01-15',
    weight: 85.5,
    status: 'alive',
    batch_id: 'BATCH001',
    current_pen_id: 'PEN001',
    sire_id: null,
    dam_id: null,
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-07-20'),
  },
  {
    id: '2',
    tag_id: 'PIG002',
    rfid_tag: 'RFID002',
    sex: 'male',
    breed: 'Duroc',
    date_of_birth: '2024-02-01',
    weight: 92.3,
    status: 'alive',
    batch_id: 'BATCH001',
    current_pen_id: 'PEN002',
    sire_id: null,
    dam_id: null,
    created_at: new Date('2024-02-01'),
    updated_at: new Date('2024-07-20'),
  },
  {
    id: '3',
    tag_id: 'PIG003',
    rfid_tag: 'RFID003',
    sex: 'female',
    breed: 'Hampshire',
    date_of_birth: '2024-02-10',
    weight: 78.9,
    status: 'alive',
    batch_id: 'BATCH002',
    current_pen_id: 'PEN001',
    sire_id: null,
    dam_id: null,
    created_at: new Date('2024-02-10'),
    updated_at: new Date('2024-07-20'),
  },
];

@Injectable()
export class PigsService {
  private pigs = [...mockPigs];
  private nextId = 4;

  create(createPigDto: CreatePigDto) {
    const newPig = {
      id: this.nextId.toString(),
      ...createPigDto,
      status: createPigDto.status || 'alive',
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.pigs.push(newPig);
    this.nextId++;
    return newPig;
  }

  findAll() {
    return this.pigs;
  }

  findOne(id: string) {
    const pig = this.pigs.find(p => p.id === id);
    if (!pig) {
      throw new NotFoundException(`Pig with ID ${id} not found`);
    }
    return pig;
  }

  findByTagId(tagId: string) {
    const pig = this.pigs.find(p => p.tag_id === tagId);
    if (!pig) {
      throw new NotFoundException(`Pig with tag ID ${tagId} not found`);
    }
    return pig;
  }

  findByBatch(batchId: string) {
    return this.pigs.filter(p => p.batch_id === batchId);
  }

  findByStatus(status: string) {
    return this.pigs.filter(p => p.status === status);
  }

  update(id: string, updatePigDto: UpdatePigDto) {
    const pigIndex = this.pigs.findIndex(p => p.id === id);
    if (pigIndex === -1) {
      throw new NotFoundException(`Pig with ID ${id} not found`);
    }
    
    this.pigs[pigIndex] = {
      ...this.pigs[pigIndex],
      ...updatePigDto,
      updated_at: new Date(),
    };
    
    return this.pigs[pigIndex];
  }

  remove(id: string) {
    const pigIndex = this.pigs.findIndex(p => p.id === id);
    if (pigIndex === -1) {
      throw new NotFoundException(`Pig with ID ${id} not found`);
    }
    
    const removedPig = this.pigs.splice(pigIndex, 1)[0];
    return { message: 'Pig deleted successfully', pig: removedPig };
  }

  getStatistics() {
    const total = this.pigs.length;
    const alive = this.pigs.filter(p => p.status === 'alive').length;
    const byBreed = this.pigs.reduce((acc, pig) => {
      acc[pig.breed] = (acc[pig.breed] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total,
      alive,
      dead: this.pigs.filter(p => p.status === 'dead').length,
      sold: this.pigs.filter(p => p.status === 'sold').length,
      slaughtered: this.pigs.filter(p => p.status === 'slaughtered').length,
      byBreed,
    };
  }
}

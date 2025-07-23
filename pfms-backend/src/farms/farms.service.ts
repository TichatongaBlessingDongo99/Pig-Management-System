import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

// Mock data for development
const mockFarms = [
  {
    id: '1',
    name: 'Green Valley Pig Farm',
    location: 'Rural District, State',
    contact_info: 'contact@greenvalley.com | +1-555-0123',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Sunrise Swine Ranch',
    location: 'Agricultural Zone, State',
    contact_info: 'info@sunriseranch.com | +1-555-0456',
    created_at: new Date('2024-01-15'),
    updated_at: new Date('2024-01-15'),
  },
];

@Injectable()
export class FarmsService {
  private farms = [...mockFarms];
  private nextId = 3;

  create(createFarmDto: CreateFarmDto) {
    const newFarm = {
      id: this.nextId.toString(),
      ...createFarmDto,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.farms.push(newFarm);
    this.nextId++;
    return newFarm;
  }

  findAll() {
    return this.farms;
  }

  findOne(id: string) {
    const farm = this.farms.find(f => f.id === id);
    if (!farm) {
      throw new NotFoundException(`Farm with ID ${id} not found`);
    }
    return farm;
  }

  update(id: string, updateFarmDto: UpdateFarmDto) {
    const farmIndex = this.farms.findIndex(f => f.id === id);
    if (farmIndex === -1) {
      throw new NotFoundException(`Farm with ID ${id} not found`);
    }
    
    this.farms[farmIndex] = {
      ...this.farms[farmIndex],
      ...updateFarmDto,
      updated_at: new Date(),
    };
    
    return this.farms[farmIndex];
  }

  remove(id: string) {
    const farmIndex = this.farms.findIndex(f => f.id === id);
    if (farmIndex === -1) {
      throw new NotFoundException(`Farm with ID ${id} not found`);
    }
    
    const removedFarm = this.farms.splice(farmIndex, 1)[0];
    return { message: 'Farm deleted successfully', farm: removedFarm };
  }
}

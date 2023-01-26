import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }
}

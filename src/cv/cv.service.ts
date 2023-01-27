import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCvDto } from './dto/addCvDto';
import { UpdateCvDto } from './dto/updateCvDto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  //read all cvs
  async getCvs(): Promise<CvEntity[]> {
    return await this.cvRepository.find();
  }

  // add new cv
  async addCv(cv: AddCvDto): Promise<CvEntity> {
    return await this.cvRepository.save(cv);
  }

  // update  cv
  async updateCv(id: string, cv: UpdateCvDto): Promise<CvEntity> {
    //on recupere l'ancien cv
    const newCv = await this.cvRepository.preload({
      id,
      ...cv,
    });
    if (!newCv) {
      throw new NotFoundException(
        `Le cv correspondant a cet id: ${id} n'existe pas `,
      );
    }
    // et puis on l'adapte
    return await this.cvRepository.save(newCv);
  }

  // update 2
  async updateCV2(critere, updatecv: UpdateCvDto) {
    return await this.cvRepository.update(critere, updatecv);
  }
}

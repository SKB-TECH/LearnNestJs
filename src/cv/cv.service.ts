import { Injectable, NotFoundException, mixin } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCvDto } from './dto/addCvDto';
import { UpdateCvDto } from './dto/updateCvDto';
import { find } from 'rxjs';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private cvRepository: Repository<CvEntity>,
  ) {}

  // findById
  async findCvById(id: string) {
    const cv = await this.cvRepository.findOneBy({
      id: id,
    });
    if (!cv) {
      throw new NotFoundException(
        `Le cv correspondant a cet id: ${id} n'existe pas `,
      );
    }
    return cv;
  }

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

  // suppresssion I du cv
  async removeCv(id: string) {
    const cvRemove = await this.findCvById(id);
    return await this.cvRepository.remove(cvRemove);
  }
  // suppresssion II du cv
  async deleteCv(id: string) {
    return await this.cvRepository.delete(id);
  }

  // deletesoft
  async softremoveCv(id: string) {
    const cvRemove = await this.findCvById(id);
    return await this.cvRepository.softDelete(cvRemove);
  }

  // recovery cv
  async recoverCV(id: string) {
    //const cvTorecover = await this.findCvById(id);
    this.cvRepository.restore(id);
  }

  /** une requette build permete de creer des requettes personnaliser qui ne figurent pas dans typeORM */
  async StatisticCvAge(maxAge = 0, minAge = 0) {
    const qb = this.cvRepository.createQueryBuilder('cv');
    qb.select('cv.age, count(cv.id) as stateCV')
      .where('cv.age >  :minAge and cv.age <  :maxAge')
      .setParameters({ maxAge, minAge })
      .groupBy('cv.age');
    console.log(qb.getSql());
    return await qb.getRawMany();
  }
}

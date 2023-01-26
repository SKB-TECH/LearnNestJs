import { Controller, Get } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private cvServices: CvService) {}
  @Get('')
  async getAllCv(): Promise<CvEntity[]> {
    return await this.cvServices.getCvs();
  }
}

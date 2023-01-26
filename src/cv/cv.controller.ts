import { Body, Controller, Get, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { AddCvDto } from './dto/addCvDto';

@Controller('cv')
export class CvController {
  constructor(private cvServices: CvService) {}

  //function read data
  @Get('all')
  async getAllCv(): Promise<CvEntity[]> {
    return await this.cvServices.getCvs();
  }

  // add new data
  @Post('new')
  async addNewCv(@Body() addDto: AddCvDto): Promise<CvEntity> {
    return await this.cvServices.addCv(addDto);
  }
}

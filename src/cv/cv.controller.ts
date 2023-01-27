import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity/cv.entity';
import { AddCvDto } from './dto/addCvDto';
import { UpdateCvDto } from './dto/updateCvDto';
import { identity } from 'rxjs';

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

  // update1
  @Patch('update/:id')
  async updateCv(
    @Body() update: UpdateCvDto,
    @Param('id') id: string,
  ): Promise<CvEntity> {
    return await this.cvServices.updateCv(id, update);
  }
  // update2
  @Patch()
  async updateCv2(@Body() UpdateObject) {
    const { critere, updatecv } = UpdateObject;
    return await this.cvServices.updateCV2(critere, updatecv);
  }

  // delete one cv
  @Delete(':id')
  async(@Param('id') id: string) {
    return this.cvServices.removeCv(id);
  }
}

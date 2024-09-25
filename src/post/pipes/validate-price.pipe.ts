import { BadRequestException, PipeTransform } from '@nestjs/common';

export class ValidatePricePipe implements PipeTransform {
  transform(value: number) {
    if (value < 0)
      throw new BadRequestException('Price must be greater than 0');
    return value;
  }
}

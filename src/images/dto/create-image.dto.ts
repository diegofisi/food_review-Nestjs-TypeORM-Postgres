import { IsBase64, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString({
    message: 'El nombre de la imagen debe ser un string',
  })
  filename: string;

  @IsBase64({
    message: 'La imagen debe estar en base64',
    each: true,
  })
  image: string;
}

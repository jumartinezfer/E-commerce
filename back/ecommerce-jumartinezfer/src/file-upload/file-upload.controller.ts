import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileUploadService } from './file-upload.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/guards/auth.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('File upload controller endpoint')
@Controller('file')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @Post('uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadProduct(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024, // esto valida que el archivo sea maximo de 200 kb
            message: 'el archivo pesa mas de 200 kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/, //valida el formato de la imagen
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(file, id) //le pasamos el archivo que se quiere cargar y el id que queremos modificar
  }
}

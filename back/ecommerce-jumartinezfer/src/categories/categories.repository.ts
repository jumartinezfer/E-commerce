import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from '../entities/categories.entity'
import { Repository } from 'typeorm'
import * as data from '../utils/seeders/data.json'

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories() {
    return await this.categoriesRepository.find() //muestra el elemento de la categoria buscada
  }

  //busca la categoria con el nombre de la categoria
  async addCategories() {
    for (const element of data) {
      const categoryExists = await this.categoriesRepository.findOne({
        where: { name: element.category },
      })

      //si  la categoria no existe, entonces la crea con el metodo create
      if (!categoryExists) {
        //ayuda a que no se repitan las categorias
        const newCategory = this.categoriesRepository.create({
          name: element.category,
        })
        await this.categoriesRepository.save(newCategory) //guarda la categoria
      }
    }
    return 'Categorias agregadas' //despues de recorrer el archivo y ver que no se repitan, retorna ese mensaje
  }
}

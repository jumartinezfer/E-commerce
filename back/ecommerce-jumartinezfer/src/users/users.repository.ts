import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/users.entity'
import { Repository } from 'typeorm'

export class usersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(page: number = 1, limit: number = 5): Promise<Partial<User>[]> {
    let users = await this.usersRepository.find()

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + +limit

    users = users.slice(startIndex, endIndex)

    return users.map(({ password, ...user }) => user)
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id }, //busca el usuario con el id que le estan pasando pero tambien trae la relacion con ordenes
      relations: {
        orders: true,
      },
    })
    if (!user) {
      return 'usuario no encontrado' //si no se encuenra al usuario sale ese mensaje
    }
    const { password, isAdmin, ...userWithoutPassword } = user //se limpia la contraseña y el isAdmin y se muentra el resultado
    return userWithoutPassword
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email })
  }

  async update(id: string, user: Partial<User>) {
    await this.usersRepository.update(id, user)
    const updateUser = await this.usersRepository.findOneBy({ id })
    const { password, isAdmin, ...userWithoutPassword } = updateUser

    return userWithoutPassword
  }

  async addOne(user: Partial<User>): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user)
    const { password, isAdmin, ...userWithoutPassword } = newUser

    return userWithoutPassword
  }

  async delete(id: string): Promise<Partial<User> | string> {
    const user = await this.usersRepository.findOneBy({ id })

    if (!user) {
      return 'usuario no encontrado'
    }

    await this.usersRepository.remove(user)

    const { password, isAdmin, ...userWithoutPassword } = user

    return userWithoutPassword
  }
}

// private users: User[] = [
//   {
//     id: '1',
//     email: 'juam@main.com',
//     name: 'Juam martinez',
//     password: 'admin123',
//     address: 'ave123',
//     phone: 3112345678,
//     country: 'colombia',
//     city: 'bogota',
//   },
//   {
//     id: '2',
//     email: 'anam@main.com',
//     name: 'ana maria',
//     password: 'admin123',
//     address: 'ave123',
//     phone: 3112345678,
//     country: 'peruana',
//     city: 'lima',
//   },
// ]

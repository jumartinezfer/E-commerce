import { User } from 'src/entities/users.entity'

export class usersRepository {
  private users: User[] = [
    {
      id: 1,
      email: 'juam@main.com',
      name: 'Juam martinez',
      password: 'admin123',
      address: 'ave123',
      phone: '3112345678',
      country: 'colombia',
      city: 'bogota',
    },
    {
      id: 2,
      email: 'anam@main.com',
      name: 'ana maria',
      password: 'admin123',
      address: 'ave123',
      phone: '3112345678',
      country: 'peruana',
      city: 'lima',
    },
  ]

  findAll(): User[] {
    return this.users
  }
}

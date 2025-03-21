import { User } from 'src/entities/users.entity'

export class usersRepository {
  private users: User[] = [
    {
      id: '1',
      email: 'juam@main.com',
      name: 'Juam martinez',
      password: 'admin123',
      address: 'ave123',
      phone: '3112345678',
      country: 'colombia',
      city: 'bogota',
    },
    {
      id: '2',
      email: 'anam@main.com',
      name: 'ana maria',
      password: 'admin123',
      address: 'ave123',
      phone: '3112345678',
      country: 'peruana',
      city: 'lima',
    },
  ]

  findAll(page: number = 1, limit: number = 5): User[] {
    const startIndex = (page - 1) * limit
    return this.users.slice(startIndex, startIndex + limit)
  }

  findOne(id: string): User | undefined {
    const user = this.users.find((user) => user.id == id)
    return user
  }

  findByEmail(email: string): User | undefined {
    const userFound = this.users.find((user) => user.email == email)
    return userFound
  }

  update(id: string, updateUser: User): string {
    const index = this.users.findIndex((user) => user.id == id)

    this.users[index].email = updateUser.email
    this.users[index].name = updateUser.name
    this.users[index].password = updateUser.password
    this.users[index].address = updateUser.address
    this.users[index].phone = updateUser.phone
    this.users[index].country = updateUser.country
    this.users[index].city = updateUser.city

    return `usuario #${this.users[index].id} ha sido actualizado`
  }

  addOne(newUser: User): string {
    const newId = this.findAll().length + 1
    newUser.id = newId.toString()
    this.users.push(newUser)
    return `Usuario #${newId.toString()} ha sido agregado`
  }

  delete(id: string) {
    const index = this.users.findIndex((user) => user.id == id)
    this.users.splice(index, 1)
    return `Usuario #${id.toString()} ha sido eliminado`
  }
}

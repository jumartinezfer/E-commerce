import { TestingModule, Test } from '@nestjs/testing'
import { UsersController } from './users.controller'
import { User } from '../entities/users.entity'
import { UsersService } from './users.service'
import { AuthGuard } from '../auth/guards/auth.guard'
import { JwtService } from '@nestjs/jwt'

describe('UsersController', () => {
  let controller: UsersController
  let mockUsersService: Partial<UsersService>

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'juan pepe',
      email: 'juan@mail.com',
      password: '123456789',
      phone: 2345678,
      country: 'colombia',
      address: 'calle siempre viva 123',
      city: 'bogota',
      isAdmin: false,
      orders: [],
    },
    {
      id: '2',
      name: 'ana maria',
      email: 'ana@mail.com',
      password: '123456789',
      phone: 2345678,
      country: 'colombia',
      address: 'calle siempre viva 123',
      city: 'bogota',
      isAdmin: false,
      orders: [],
    },
  ]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOne: jest.fn().mockResolvedValue(mockUsers[0]),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sing: jest.fn().mockResolvedValue('mock-token'),
            verify: jest.fn().mockResolvedValue({ userId: 'mock-user-id' }),
          },
        },
      ],
    }).compile()

    controller = module.get<UsersController>(UsersController)
    mockUsersService = module.get<UsersService>(UsersService)
  })
  it('deberia estar definido', () => {
    expect(controller).toBeDefined()
  })
  describe('findAll', () => {
    it('deberia devolver una lista de usuarios', async () => {
      const result = await controller.findAll()
      expect(result).toEqual(mockUsers)
    })
  })

  describe('findOne', () => {
    it('deberia retornar un user', async () => {
      const result = await controller.fidOne('1')
      expect(result).toEqual(mockUsers[0])
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1')
    })
  })
})

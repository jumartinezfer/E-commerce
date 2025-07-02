import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { App } from 'supertest/types'
import { AppModule } from '../src/app.module'
import { usersRepository } from '../src/users/users.repository'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

describe('AppController (e2e)', () => {
  let app: INestApplication<App>
  let mockUsersRepository: Partial<usersRepository>
  let jwtService: JwtService

  const testUser = {
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
  }

  beforeEach(async () => {
    mockUsersRepository = {
      findByEmail: jest.fn().mockReturnValue(testUser),
    }
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(usersRepository)
      .useValue(mockUsersRepository)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    jwtService = moduleFixture.get<JwtService>(JwtService)
    jest
      .spyOn(
        bcrypt as {
          compare: (password: string, hash: string) => Promise<boolean>
        },
        'compare',
      )
      .mockImplementation((password: string, hash: string) => {
        return Promise.resolve(password === '123456789')
      })
  })

  it('POST en "/auth/singin"  deberia autenticar el usuario y retornar un token', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({ email: 'ana@mail.com', password: '123456789' })
      .expect((res) => {
        expect(res.body).toHaveProperty('token')
        const responseBody = res.body as { token: string }
        expect(responseBody.token).toBeDefined()
      })
  })
  afterAll(async () => {
    await app.close()
  })
})

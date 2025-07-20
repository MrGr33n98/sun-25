import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let users: any;

  beforeAll(async () => {
    users = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findOne: jest.fn().mockResolvedValue({ id: '1', email: 'e', name: 'n', role: 'user' })
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(UsersService)
      .useValue(users)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/login (POST)', async () => {
    users.findByEmail.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      name: 'Test',
      role: 'user',
      password: await bcrypt.hash('pass', 10),
    });

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'pass' })
      .expect(200);

    expect(response.body.user.email).toBe('test@example.com');
    expect(response.body.access_token).toBeDefined();
  });

  it('/auth/register (POST)', async () => {
    users.findByEmail.mockResolvedValueOnce(null);
    users.create.mockResolvedValue({
      id: '2',
      email: 'new@example.com',
      name: 'New',
      role: 'user',
      password: await bcrypt.hash('pass', 10),
    });

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'new@example.com', name: 'New', password: 'pass' })
      .expect(201);

    expect(response.body.user.email).toBe('new@example.com');
    expect(response.body.access_token).toBeDefined();
  });
});

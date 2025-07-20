import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

const user = {
  id: '1',
  email: 'test@example.com',
  name: 'Test',
  role: 'user',
  password: bcrypt.hashSync('pass', 10)
};

const createUserDto = {
  email: 'new@example.com',
  name: 'New',
  password: 'pass'
};

const loginDto = { email: user.email, password: 'pass' };

describe('AuthService', () => {
  let service: AuthService;
  let users: Partial<Record<string, any>>;

  beforeEach(async () => {
    users = {
      findByEmail: jest.fn().mockResolvedValue(user),
      create: jest.fn().mockResolvedValue({ ...user, ...createUserDto, id: '2', password: bcrypt.hashSync('pass', 10) }),
      findOne: jest.fn().mockResolvedValue(user)
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: 'test' })],
      providers: [AuthService, { provide: UsersService, useValue: users }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('validates user credentials', async () => {
    const result = await service.validateUser(user.email, 'pass');
    expect(result).toEqual({ id: user.id, email: user.email, name: user.name, role: user.role });
  });

  it('returns null for invalid credentials', async () => {
    (users.findByEmail as jest.Mock).mockResolvedValue(undefined);
    await expect(service.validateUser('none', 'pass')).resolves.toBeNull();
  });

  it('logs in a user and returns token', async () => {
    const res = await service.login(loginDto);
    expect(res.user.email).toBe(user.email);
    expect(res.access_token).toBeDefined();
  });

  it('registers a new user', async () => {
    (users.findByEmail as jest.Mock).mockResolvedValueOnce(null);
    const res = await service.register(createUserDto as any);
    expect(res.user.email).toBe(createUserDto.email);
    expect(users.create).toHaveBeenCalled();
  });

  it('gets profile', async () => {
    const res = await service.getProfile('1');
    expect(res.email).toBe(user.email);
    expect(res.password).toBeUndefined();
  });
});

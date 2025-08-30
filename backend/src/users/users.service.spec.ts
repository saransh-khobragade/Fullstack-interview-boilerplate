import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    service.users = [];
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      age: 25,
      isActive: true,
    };

    const result = await service.create(createUserDto);

    expect(result.name).toBe('John Doe');
    expect(result.email).toBe('john@example.com');
    expect(service.users).toHaveLength(1);
  });

  it('should find all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should throw NotFoundException when user not found', async () => {
    const fakeId = '123e4567-e89b-12d3-a456-426614174000' as any;
    await expect(service.findOne(fakeId)).rejects.toThrow(NotFoundException);
  });
});

import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { uuidv7obj, UUID } from 'uuidv7';

@Injectable()
export class UsersService {
  
  public users: User[] = []

  constructor() {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    const id = uuidv7obj()

    const newUser = {
      id,
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      age: createUserDto.age,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.users.push(newUser)

    return Promise.resolve(newUser)
  }

  async findAll(): Promise<User[]> {
   return Promise.resolve(this.users)
  }

  async findOne(id: UUID): Promise<User> {
    const user = this.users.find(x=>x.id == id)
    if (!user) {
      throw new Error(`User with id ${id} not found`)
    }
    return Promise.resolve(user)
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<User> {
    const index = this.users.findIndex(x=>x.id == id)
    if (index === -1) {
      throw new Error(`User with id ${id} not found`)
    }
    this.users[index] = {id,...updateUserDto}
    return Promise.resolve(this.users[index])
  }

  async remove(id: UUID): Promise<void> {
    const index = this.users.findIndex(x=>x.id == id)
    if (index === -1) {
      throw new Error(`User with id ${id} not found`)
    }
    this.users.splice(index, 1)
    return Promise.resolve()
  }
}
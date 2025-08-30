import { UUID } from "uuidv7";

export class User {
  id!: UUID;
  name!: string;
  email!: string;
  password!: string;
  age!: number;
  isActive!: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import bcrypt from 'bcryptjs';

@Entity()
export class UserEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  constructor(username: string, firstName: string, lastName: string, email: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
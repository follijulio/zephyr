import { Note } from "./note";

export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  Notes?: Note[];

  constructor(
    name: string,
    email: string,
    password: string,
    id?: string,
    Notes?: Note[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.Notes = Notes;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password
    };
  }

  deserialize(data: User): User {
    return new User(data.name, data.email, data.password, data.id);
  }
}

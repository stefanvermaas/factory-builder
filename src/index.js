import { name } from 'faker';
import { create, build } from './FactoryBuilder';

class User {
  attributes() {
    return {
      firstName: name.firstName(),
      lastName: name.lastName(),
    };
  }

  beforeCreate(data) {
    return {
      ...data,
      name: `${data.firstName} ${data.lastName}`,
    };
  }
}

console.log(create(User, { id: 7 }));
console.log(build(User));

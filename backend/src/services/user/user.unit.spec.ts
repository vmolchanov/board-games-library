import {UserController} from './user.controller';
import {UserService} from './user.service';
import {User} from './user.model';
import {Sequelize} from 'sequelize-typescript';
import {DbService} from '../../utils/db';

describe('UserController', () => {
  let userService: UserService;
  let memoryDatabase: Sequelize

  beforeAll(async () => {
    memoryDatabase = await DbService.createMemoryDatabase([User]);

    userService = new UserService(User);
  });

  describe('User', () => {
    beforeEach(async () => {
      await User.create({
        id: 1,
        telegramId: 'hf437tfgus',
        firstName: 'Ivan',
        lastName: 'Ivanov',
        userName: 'iivanov1990',
      });

      await User.create({
        id: 2,
        telegramId: 'f7848t3f',
        firstName: 'Petr',
        lastName: 'Petrov',
        userName: 'petrovka78',
      });
    });

    afterEach(async () => {
      await memoryDatabase.truncate();
    });

    it('get all users', async () => {
      const users = await userService.getAllUsers();

      expect(users.length).toBe(2);

      expect(users[0].id).toBe(1);
      expect(users[0].telegramId).toBe('hf437tfgus');
      expect(users[0].firstName).toBe('Ivan');
      expect(users[0].lastName).toBe('Ivanov');
      expect(users[0].userName).toBe('iivanov1990');

      expect(users[1].id).toBe(2);
      expect(users[1].telegramId).toBe('f7848t3f');
      expect(users[1].firstName).toBe('Petr');
      expect(users[1].lastName).toBe('Petrov');
      expect(users[1].userName).toBe('petrovka78');
    });

    it('get user by id', async () => {
      const user = await userService.getUserById('1');

      expect(user.id).toBe(1);
      expect(user.telegramId).toBe('hf437tfgus');
      expect(user.firstName).toBe('Ivan');
      expect(user.lastName).toBe('Ivanov');
      expect(user.userName).toBe('iivanov1990');
    });

    it('add user', async () => {
      const user = await userService.createUser({
        telegramId: '12345',
        firstName: 'Vasiliy',
        lastName: 'Nazarov',
        userName: 'nullundefined',
      });

      expect(user.telegramId).toBe('12345');
      expect(user.firstName).toBe('Vasiliy');
      expect(user.lastName).toBe('Nazarov');
      expect(user.userName).toBe('nullundefined');
      expect(typeof user.id).toBe('number');
    });

    it('change user', async () => {
      const user = await userService.editUser({
        id: 2,
        telegramId: 'f7848t3f',
        firstName: 'Petya',
        lastName: 'Petrov',
        userName: 'petrovka79',
      });

      expect(user.firstName).toBe('Petya');
      expect(user.userName).toBe('petrovka79');
    });

    it('Delete user', async () => {
      await userService.deleteUser('1');

      const users = await userService.getAllUsers();

      const user = users.find(user => user.id === 1);

      expect(user).toBeUndefined();
    });
  });

  afterAll(() => {
    memoryDatabase.close();
  });
});

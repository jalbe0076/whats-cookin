import { expect } from 'chai';
import { sampleUsersData } from '../src/data/sample-users';
import { getRandomUser } from '../src/users'

describe('select a random user', () => {
  it('should select a random user by index position', () => {
    getRandomUser(sampleUsersData);
    expect(getRandomUser).to.be.a('function');
  });

  it('should get a random user as an object', () => {
    const user = getRandomUser(sampleUsersData);
    expect(user).to.be.a('object');
  });

  it('user should have a name', () => {
    const user = getRandomUser(sampleUsersData);
    expect(user.name).to.exist;
  });
  
  it('user should have an id', () => {
    const user = getRandomUser(sampleUsersData);
    expect(user.id).to.exist;
  });
  
  it('user should have a pantry', () => {
    const user = getRandomUser(sampleUsersData);
    expect(user.pantry).to.exist;
  });

  it('should return a message if the recipe is not found', () => {
    const user = getRandomUser();
    expect(user).to.equal('User not found');
  });
});
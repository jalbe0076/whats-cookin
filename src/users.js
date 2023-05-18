const getRandomUser = (userList) => {
  if(!userList) {
    return `User not found`;
  }
  const indexPosition = Math.floor(Math.random() * userList.length);
  return userList[indexPosition];
};

export {getRandomUser}
const usersDB = require('./users.mongo');

const DEFAULT_USER_ID = 0;

async function addNewUser(user) {
    const newUserId = await getLatestUserId() + 1;

    const newUser = Object.assign(user, {
      id: newUserId
    });
    
    console.log(newUser, 'newUser');

    const savedUser = await saveUser(newUser);

    console.log(savedUser, 'savedUser')
    
    return savedUser
};

async function getLatestUserId() {
  const latestUser = await usersDB
    .findOne()
    .sort('-id');
    
  console.log(latestUser, 'latestUser');
  
  if(!latestUser) {
    return DEFAULT_USER_ID;
  }
  
  return latestUser.id;
};
  
async function saveUser(user) {
  return await usersDB.findOneAndUpdate({
    id: user.id,
  }, user, {
    upsert: true,
    new: true,
  })
};

async function getUser(username) {
  const user = await usersDB.findOne({
    username
  });

  return user;
};

async function checkEmail(email) {
  const user = await usersDB.findOne({
    email
  });

  return user;
};

async function checkUsername(username) {
  const user = await usersDB.findOne({
    username
  });

  return user;
}

module.exports = {
  addNewUser,
  getUser,
  checkEmail,
  checkUsername
}
/**
 * Created by eatong on 17-11-28.
 */
const User = require('../schema/UserSchema');
const MD5 = require('crypto-js/md5');

async function login(account, password) {
  return await User.findOne({account, password: MD5(password).toString(), enable: {$ne: false}});
}

async function getAccounts() {
  return await User.find({enable: {$ne: false}}).select('account name');
}

async function addAccount(data) {
  data.password = MD5(data.password || '123');
  const user = new User(data);
  return await user.save();

}

async function updateAccount(data) {
  const user = await User.findById(data.id);
  user.name = data.name;
  user.account = data.account;
  await user.save();
  return user;
}

async function deleteAccount(_id) {
  const user = await User.findById(_id);
  user.enable = false;
  await user.save();
  return user;
}

module.exports ={login, getAccounts, addAccount, deleteAccount, updateAccount}


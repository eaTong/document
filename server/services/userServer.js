/**
 * Created by eatong on 17-11-28.
 */
import User from '../schema/UserSchema';
import MD5 from 'crypto-js/md5';

async function login(account, password) {
  return await User.findOne({account, password: MD5(password).toString()});
}

async function getUsers() {
  return await User.find().select('account name');
}

async function addAccount(data) {
  data.password = MD5(data.password || '123');
  const user = new User(data);
  return await user.save();
}

export default {login, getUsers, addAccount}

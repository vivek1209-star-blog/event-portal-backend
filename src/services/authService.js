import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const register = async ({ username, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  return user;
};

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Save current token (single login)
  user.currentToken = token;
  await user.save();

  return { token, user };
};

const logout = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  user.currentToken = null;
  await user.save();
};

export default { register, login, logout };

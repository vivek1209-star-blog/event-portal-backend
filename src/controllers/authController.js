import authService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await authService.login(req.body);
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    await authService.logout(req.user.id);
    res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

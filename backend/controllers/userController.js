const User = require('../modules/User'); // Update path to User module
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Register new user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json( user );
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.json( user );
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};
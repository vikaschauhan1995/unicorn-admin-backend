const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({ error: 'Authorization token is required' });
  }
  // console.log("authorization=>", authorization);
  const token = authorization?.split(' ')[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findOne({ _id }).select('_id');
    next();
  } catch (error) {
    console.log("Error: ", error);
    res.json({ error: 'Authorization token error ' + error.message });
  }
}

module.exports = auth;
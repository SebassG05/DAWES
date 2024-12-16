const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'your_secret_token') {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
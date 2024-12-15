import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../models/index.js';

const listUsers = (req, res) => {
  res.json(getAllUsers());
};

const getUser = (req, res) => {
  const user = getUserById(parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

const addUser = (req, res) => {
  const newUser = createUser(req.body);
  res.status(201).json(newUser);
};

const modifyUser = (req, res) => {
  const updatedUser = updateUser(parseInt(req.params.id), req.body);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).send('User not found');
  }
};

const removeUser = (req, res) => {
  const deletedUser = deleteUser(parseInt(req.params.id));
  if (deletedUser) {
    res.json(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
};

export { listUsers, getUser, addUser, modifyUser, removeUser };
const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getById(id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.getUtilByEmail = (req, res) => {
  const email = req.params.email;
  User.getByEmail( email, (err, result)=>{
    if(err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.createUser = (req, res) => {
  const data = req.body;
  User.create(data, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, ...data });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  User.update(id, data, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Utilisateur modifié' });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Utilisateur supprimé' });
  });
};

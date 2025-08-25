const db = require('../config/db');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM formation.utilisateurs', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM formation.utilisateurs WHERE id = ?', [id], callback);
  },

  getByEmail: (email, callback) =>{
    db.query('SELECT * FROM formation.utilisateurs WHERE email = ?', email, callback);
  },

  create: (userData, callback) => {
    db.query('INSERT INTO users SET ?', userData, callback);
  },

  update: (id, userData, callback) => {
    db.query('UPDATE formation.utilisateurs SET ? WHERE id = ?', [userData, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM formation.utilisateurs WHERE id = ?', [id], callback);
  }

};

module.exports = User;

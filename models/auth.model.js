const db = require('../config/db');
const { connexion } = require('../controllers/auth.controller');

const Auth = {
    Inscription: (data, callback) => {
        db.query('INSERT INTO formation.utilisateurs SET ?', data, callback)

    },

    getByEmail: (email, callback) => {
        db.query('SELECT * FROM formation.utilisateurs WHERE email = ?', email, callback);
    }
}

module.exports = Auth;
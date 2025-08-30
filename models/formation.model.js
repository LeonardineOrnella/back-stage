const db = require('../config/db');

const Formation = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.formations', callback);
    },

    getById: (id_form, callback) => {
        db.query('SELECT * FROM formation.formations WHERE id_form = ?', id_form, callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO formation.formations SET ?', data, callback);
    },

    update: (id_form, data, callback) => {
        db.query('UPDATE formation.formations SET ? WHERE id_form = ?', [data, id_form], callback);
    },

    delete: (id_form, callback) => {
        db.query('DELETE FROM formation.formations WHERE id_form = ?', id_form, callback);
    },
};

module.exports = Formation;



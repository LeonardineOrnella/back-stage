const db = require('../config/db');

const Ressource = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.RESSOURCE', callback);
    },

    getByChapitre: (id_chap, callback) => {
        db.query('SELECT * FROM formation.RESSOURCE WHERE id_chap = ?', id_chap, callback);
    },

    getById: (id_res, callback) => {
        db.query('SELECT * FROM formation.ressources WHERE id_res = ?', id_res, callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO formation.RESSOURCE SET ?', data, callback);
    },

    update: (id_res, data, callback) => {
        db.query('UPDATE formation.RESSOURCE SET ? WHERE id_res = ?', [data, id_res], callback);
    },

    delete: (id_res, callback) => {
        db.query('DELETE FROM formation.RESSOURCE SET ? WHERE id_res = ?', id_res, callback);
    },
};

module.exports = Ressource;

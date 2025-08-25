const db = require('../config/db');

const Question = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.questions ', callback);
    },

    getById: (id_quest, callback) => {
        db.query('SELECT *FROM formation.questions WHERE id_quest = ?', id_quest, callback);
    },
    
    create: (data, callback) => {
        db.query('INSERT INTO formation.questions SET ?', data, callback);
    },

    update: (id_quest, data, callback) => {
        db.query('UPDATE formation.questions SET ? WHERE id_quest = ?', [data, id_quest], callback);
    },

    delete: (id_quest, callback) => {
        db.query('DELETE FROM formation.questions WHERE id_quest = ?', id_quest, callback);
    },
};

module.exports = Question;
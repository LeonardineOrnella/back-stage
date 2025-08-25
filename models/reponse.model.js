const db = require ('../config/db');


const Reponse = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.reponses', callback );
    },

    getById: (id_rep, callback) => {
        db.query('SELECT * FROM formation.reponses WHERE id_rep = ? ', id_rep, callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO formation.reponses SET ?', data, callback);
    },

    update: (id_rep, data, callback) =>{
        db.query('UPDATE formation.reponses SET ? WHERE id_rep = ? ',[data, id_rep], callback);
    },


     delete: (id_rep, callback) =>{
        db.query('DELETE  FROM formation.reponses WHERE id_rep = ? ',id_rep, callback);
    },
}

module.exports = Reponse;
const db = require ('../config/db');


const Resultat = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.resultats', callback );
    },

    getById: (id_result, callback) => {
        db.query('SELECT * FROM formation.resultats WHERE id_result = ? ', id_result, callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO formation.resultats SET ?', data, callback);
    },

    update: (id_result, data, callback) =>{
        db.query('UPDATE formation.resultats SET ? WHERE id_result = ? ',[data, id_result], callback);
    },


     delete: (id_result, callback) =>{
        db.query('DELETE  FROM formation.resultats WHERE id_result = ? ',id_result, callback);
    },
}

module.exports = Resultat;
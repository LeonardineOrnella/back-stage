const db = require ('../config/db');


const Chapitre = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.chapitres', callback );
    },

    getById: (id_chap, callback) => {
        db.query('SELECT * FROM formation.chapitres WHERE id_chap = ? ', id_chap, callback);
    },

    create: (data, callback) => {
        console.log(data);
        
        db.query('INSERT INTO formation.chapitres SET ?', data, callback);
    },

    update: (id_chap, data, callback) =>{
        db.query('UPDATE formation.chapitres SET ? WHERE id_chap = ? ',[data, id_chap], callback);
    },


     delete: (id_chap, callback) =>{
        db.query('DELETE  FROM formation.chapitres WHERE id_chap = ? ',id_chap, callback);
    },
}

module.exports = Chapitre;
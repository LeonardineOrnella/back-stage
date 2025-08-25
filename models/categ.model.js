const db = require ('../config/db');


const Categorie = {
    getAll: (callback) => {
        db.query('SELECT * FROM formation.categories', callback );
    },

    getById: (id_categ, callback) => {
        db.query('SELECT * FROM formation.categories WHERE id_categ = ? ', id_categ, callback);
    },

    create: (data, callback) => {
        
        
        db.query('INSERT INTO formation.categories SET ?', data, callback);
    },

    update: (id_categ, data, callback) =>{
        console.log(data);
        
        db.query('UPDATE formation.categories SET ? WHERE id_categ = ? ',[data, id_categ], callback);
    },


     delete: (id_categ, callback) =>{
        db.query('DELETE  FROM formation.categories WHERE id_categ = ? ',id_categ, callback);
    },
}

module.exports = Categorie;
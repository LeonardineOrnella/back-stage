const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Connexion sans base d'abord
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  multipleStatements: true,
});

const sql = `
  CREATE DATABASE IF NOT EXISTS formation;
  USE formation;

  CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    mdp VARCHAR(255),
    role ENUM('admin', 'formateur', 'apprenant') DEFAULT 'apprenant'
  );
`;



db.connect(async (err) => {
  if (err) throw err;
  console.log('✅ Connexion MySQL réussie.');

  db.query(sql, async (err) => {
    if (err) throw err;
    console.log('✅ Base de données et table créées.');

    // Vérifie si un admin existe déjà
    const checkAdminSql = "SELECT * FROM formation.utilisateurs WHERE role = 'admin' LIMIT 1";

    db.query(checkAdminSql, async (err, results) => {
      if (err) throw err;

      if (results.length === 0) {
        const hashedPassword = await bcrypt.hash('admin123', 10);

        const insertAdminSql = `
          INSERT INTO formation.utilisateurs (nom, prenom, email, mdp, role)
          VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertAdminSql, ['Admin', 'Système', 'admin@formation.com', hashedPassword, 'admin'], (err) => {
          if (err) throw err;
          console.log('✅ Admin par défaut créé : admin@formation.com / admin123');
          db.end();
        });
      } else {
        console.log('ℹ️ Admin déjà existant. Aucune insertion.');
        db.end();
      }
    });
  });
});

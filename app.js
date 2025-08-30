const express = require('express')
const cors = require('cors'); // ✅ importer cors
const path = require('path');
const fs = require('fs');
const app = express();
const userRoutes = require('./routes/user.routes');
const AuthRoutes = require('./routes/auth.routes');
const CategRoutes = require('./routes/categorie.routes');
const ChapRoutes = require ('./routes/chap.routes');
const ResultRoutes = require ('./routes/reponse.routes');
const QuestionRoutes = require ('./routes/question.routes');
const ResultatRoutes = require ('./routes/resultats.routes');
const FormationRoutes = require('./routes/formation.routes');

// ✅ autoriser les requêtes du frontend (ex: http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Remplace par l’URL de ton frontend en production
  credentials: true
}));

app.use(express.json());
// ✅ S'assurer que le dossier d'upload existe
const uploadsDir = path.join(__dirname, 'uploads');
const ressourcesDir = path.join(uploadsDir, 'ressources');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(ressourcesDir)) {
  fs.mkdirSync(ressourcesDir);
}

// Rendre le dossier uploads accessible publiquement
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api' , AuthRoutes);
app.use('/api/categories', CategRoutes);
app.use('/api/chapitres', ChapRoutes);
app.use('/api/reponse', ResultRoutes);
app.use('/api/question', QuestionRoutes);
app.use('/api/resultat', ResultatRoutes);
app.use('/api/formations', FormationRoutes);
// ✅ routes ressources (upload fichiers)
const RessourceRoutes = require('./routes/ressource.routes');
app.use('/api/ressources', RessourceRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

const express = require('express')
const cors = require('cors'); // ✅ importer cors
const app = express();
const userRoutes = require('./routes/user.routes');
const AuthRoutes = require('./routes/auth.routes');
const CategRoutes = require('./routes/categorie.routes');
const ChapRoutes = require ('./routes/chap.routes');
const ResultRoutes = require ('./routes/reponse.routes');
const QuestionRoutes = require ('./routes/question.routes');
const ResultatRoutes = require ('./routes/resultats.routes');

// ✅ autoriser les requêtes du frontend (ex: http://localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000', // Remplace par l’URL de ton frontend en production
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api' , AuthRoutes);
app.use('/api/categories', CategRoutes);
app.use('/api/chapitres', ChapRoutes);
app.use('/api/reponse', ResultRoutes);
app.use('/api/question', QuestionRoutes);
app.use('/api/resultat', ResultatRoutes);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

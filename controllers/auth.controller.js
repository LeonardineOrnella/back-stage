const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');
const Connex = require('../controllers/user.controller')
const User = require('../models/user.model')
require('dotenv').config();


exports.inscription = (req, res) => {
  const { nom, prenom, email, mdp, role } = req.body
  const hash = bcrypt.hashSync(mdp, 10);
  const user = { nom, prenom, email, mdp: hash, role }
  
  Auth.getByEmail(email, (erreur, result) => {
    if(erreur) throw erreur;
    if(result.length > 0){
      return res.json({massage: "cet mail est déjà utilisé, veuillez vous connecter"});
    }else{
      Auth.Inscription(user, (erreur, result) => {
        if (erreur) throw erreur;
        res.json({ message: 'inscription enregistrer' })
      })
    }
  })
  
}


exports.connexion = (req, res) => {
  const { email, mdp } = req.body;

  User.getByEmail(email, async (erreur, result) => {
    if (erreur) throw erreur;

    if (result.length > 0) {
      // Vérifier le mot de passe
      const motDePasseValide = await bcrypt.compare(mdp, result[0].mdp);

      if (motDePasseValide) {

        const utilisateur = result[0]
        const token = jwt.sign(
          {
            id: utilisateur.id,
            email: utilisateur.email,
            role: utilisateur.role
          },
          process.env.JWT_SECRET,
          { expiresIn: '2h' } // expiration du token
        );

        res.json({ message: "Connexion réussie", token, user: {
          id: utilisateur.id,
          nom: utilisateur.nom,
          prenom: utilisateur.prenom,
          email: utilisateur.email,
          role: utilisateur.role
        } });

      } else {
        res.json({ message: "Mot de passe incorrect" ,status:201});
      }
    } else {
      res.json({ message: "Email n'existe pas", status:201 });
    }
  });
};
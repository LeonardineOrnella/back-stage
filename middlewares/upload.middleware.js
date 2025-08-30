const multer = require('multer');
const path = require('path');

// Configuration du stockage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/ressources'); // Dossier de stockage
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'video/mp4', 'video/mpeg', 'video/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Seuls les fichiers PDF et vidéos sont autorisés.'));
    }
};

// Middleware pour un seul fichier
const singleUpload = multer({ storage, fileFilter });

// Middleware pour plusieurs fichiers
const arrayUpload = multer({ storage, fileFilter });

module.exports = {
    single: singleUpload.single('file'),
    array: arrayUpload.array('files', 10)
};

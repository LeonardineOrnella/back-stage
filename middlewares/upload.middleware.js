const multer = require('multer');
const path = require('path');

// Configuration du stockage pour les ressources (PDF, vidéos)
const ressourcesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/ressources');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// Configuration du stockage pour les images de couverture
const couvertureStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/couvertures');
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// Filtrage des types de fichiers pour les ressources
const ressourcesFileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'video/mp4', 'video/mpeg', 'video/ogg', 'video/avi', 'video/mov', 'video/mkv'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Seuls les fichiers PDF et vidéos sont autorisés pour les ressources.'));
    }
};

// Filtrage des types de fichiers pour les images de couverture
const couvertureFileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Seules les images (JPEG, PNG, GIF, WebP) sont autorisées pour la couverture.'));
    }
};

// Middleware pour les ressources (PDF, vidéos)
const ressourcesUpload = multer({ 
    storage: ressourcesStorage, 
    fileFilter: ressourcesFileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max
    }
});

// Middleware pour les images de couverture
const couvertureUpload = multer({ 
    storage: couvertureStorage, 
    fileFilter: couvertureFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max
    }
});

// Middleware pour un seul fichier ressource
const singleRessourceUpload = ressourcesUpload.single('ressource');

// Middleware pour plusieurs fichiers ressources
const arrayRessourcesUpload = ressourcesUpload.array('ressources', 10);

// Middleware pour l'image de couverture
const singleCouvertureUpload = couvertureUpload.single('image_couverture');

// Middleware combiné pour formation (couverture + ressources)
const formationUpload = multer({
    storage: multer.memoryStorage(), // Stockage temporaire en mémoire
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'image_couverture') {
            return couvertureFileFilter(req, file, cb);
        } else if (file.fieldname === 'ressources') {
            return ressourcesFileFilter(req, file, cb);
        }
        cb(null, true);
    },
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB max
    }
}).fields([
    { name: 'image_couverture', maxCount: 1 },
    { name: 'ressources', maxCount: 10 }
]);

module.exports = {
    single: singleRessourceUpload,
    array: arrayRessourcesUpload,
    couverture: singleCouvertureUpload,
    formation: formationUpload
};

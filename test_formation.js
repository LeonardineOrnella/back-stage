const fs = require('fs');
const path = require('path');

// Script de test pour vérifier la configuration des formations

console.log('🔍 Vérification de la configuration des formations...\n');

// 1. Vérifier l'existence des dossiers d'upload
const uploadDirs = [
    'uploads/couvertures',
    'uploads/ressources'
];

console.log('📁 Vérification des dossiers d\'upload:');
uploadDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir} - Existe`);
    } else {
        console.log(`❌ ${dir} - Manquant (créer avec: mkdir -p ${dir})`);
    }
});

// 2. Vérifier les permissions des dossiers
console.log('\n🔐 Vérification des permissions:');
uploadDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        try {
            fs.accessSync(dir, fs.constants.R_OK | fs.constants.W_OK);
            console.log(`✅ ${dir} - Permissions OK`);
        } catch (err) {
            console.log(`❌ ${dir} - Problème de permissions`);
        }
    }
});

// 3. Vérifier la configuration du middleware
console.log('\n⚙️ Vérification du middleware d\'upload:');
try {
    const uploadMiddleware = require('./middlewares/upload.middleware');
    const middlewareKeys = Object.keys(uploadMiddleware);
    
    if (middlewareKeys.includes('formation')) {
        console.log('✅ Middleware formation - Disponible');
    } else {
        console.log('❌ Middleware formation - Manquant');
    }
    
    if (middlewareKeys.includes('couverture')) {
        console.log('✅ Middleware couverture - Disponible');
    } else {
        console.log('❌ Middleware couverture - Manquant');
    }
    
    if (middlewareKeys.includes('array')) {
        console.log('✅ Middleware array - Disponible');
    } else {
        console.log('❌ Middleware array - Manquant');
    }
    
} catch (err) {
    console.log('❌ Erreur lors du chargement du middleware:', err.message);
}

// 4. Vérifier la configuration de la base de données
console.log('\n🗄️ Vérification de la configuration de la base de données:');
try {
    const dbConfig = require('./config/db');
    console.log('✅ Configuration de la base de données - Chargée');
} catch (err) {
    console.log('❌ Erreur lors du chargement de la config DB:', err.message);
}

// 5. Vérifier le contrôleur des formations
console.log('\n🎮 Vérification du contrôleur des formations:');
try {
    const formationController = require('./controllers/formation.controller');
    const controllerMethods = Object.keys(formationController);
    
    const requiredMethods = ['createFormation', 'getAllFormation', 'getByIdFormation', 'updateFormation', 'deleteFormation'];
    requiredMethods.forEach(method => {
        if (controllerMethods.includes(method)) {
            console.log(`✅ ${method} - Disponible`);
        } else {
            console.log(`❌ ${method} - Manquant`);
        }
    });
    
} catch (err) {
    console.log('❌ Erreur lors du chargement du contrôleur:', err.message);
}

// 6. Vérifier les routes
console.log('\n🛣️ Vérification des routes:');
try {
    const formationRoutes = require('./routes/formation.routes');
    console.log('✅ Routes des formations - Chargées');
} catch (err) {
    console.log('❌ Erreur lors du chargement des routes:', err.message);
}

// 7. Vérifier les dépendances
console.log('\n📦 Vérification des dépendances:');
try {
    const packageJson = require('./package.json');
    const requiredDeps = ['multer', 'express', 'mysql2'];
    
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`✅ ${dep} - Installé (v${packageJson.dependencies[dep]})`);
        } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
            console.log(`✅ ${dep} - Installé en dev (v${packageJson.devDependencies[dep]})`);
        } else {
            console.log(`❌ ${dep} - Non installé`);
        }
    });
    
} catch (err) {
    console.log('❌ Erreur lors de la lecture du package.json:', err.message);
}

console.log('\n🎯 Résumé des vérifications:');
console.log('Pour une configuration complète, assurez-vous que:');
console.log('1. Tous les dossiers d\'upload existent');
console.log('2. Les permissions sont correctes');
console.log('3. La base de données est configurée');
console.log('4. Toutes les dépendances sont installées');
console.log('5. Le serveur est redémarré après les modifications');

console.log('\n📚 Documentation disponible dans: FORMATION_UPDATES.md');
console.log('🔄 Script de mise à jour de la DB: update_database.sql');

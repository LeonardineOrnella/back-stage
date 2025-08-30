const Formation = require('./models/formation.model');

console.log('🧪 Test simple de l\'API des formations...\n');

// Test de la méthode getAll
console.log('📚 Test de getAll()...');
Formation.getAll((err, results) => {
    if (err) {
        console.error('❌ Erreur getAll():', err.message);
        console.error('Stack:', err.stack);
        return;
    }
    
    console.log('✅ getAll() réussi!');
    console.log('Nombre de formations:', results.length);
    
    if (results.length > 0) {
        console.log('\n📖 Première formation:');
        const formation = results[0];
        console.log('  - ID:', formation.id_form);
        console.log('  - Titre:', formation.titre_form);
        console.log('  - Statut:', formation.statut_form);
        console.log('  - Chapitres:', formation.chapitres ? formation.chapitres.length : 0);
        
        if (formation.chapitres && formation.chapitres.length > 0) {
            console.log('\n📝 Premier chapitre:');
            const chapitre = formation.chapitres[0];
            console.log('  - ID:', chapitre.id_chap);
            console.log('  - Titre:', chapitre.titre_chap);
            console.log('  - Ressources:', chapitre.ressources ? chapitre.ressources.length : 0);
        }
    } else {
        console.log('⚠️ Aucune formation trouvée');
    }
    
    console.log('\n🎉 Test terminé!');
    process.exit(0);
});

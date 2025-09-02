const Formation = require('./models/formation.model');

console.log('🧪 Test du modèle Formation avec chapitres et ressources...\n');

// Test 1: Récupérer toutes les formations
console.log('📚 Test getAll() - Récupération de toutes les formations:');
Formation.getAll((err, results) => {
    if (err) {
        console.error('❌ Erreur getAll():', err.message);
        return;
    }
    
    console.log('✅ Succès! Nombre de formations:', results.length);
    
    if (results.length > 0) {
        const formation = results[0];
        console.log('\n📖 Première formation:');
        console.log('  - ID:', formation.id_form);
        console.log('  - Titre:', formation.titre_form);
        console.log('  - Statut:', formation.statut_form);
        console.log('  - Nombre de chapitres:', formation.chapitres ? formation.chapitres.length : 0);
        
        if (formation.chapitres && formation.chapitres.length > 0) {
            const chapitre = formation.chapitres[0];
            console.log('\n📝 Premier chapitre:');
            console.log('  - ID:', chapitre.id_chap);
            console.log('  - Titre:', chapitre.titre_chap);
            console.log('  - Nombre de ressources:', chapitre.ressources ? chapitre.ressources.length : 0);
            
            if (chapitre.ressources && chapitre.ressources.length > 0) {
                const ressource = chapitre.ressources[0];
                console.log('\n📎 Première ressource:');
                console.log('  - ID:', ressource.id_res);
                console.log('  - Type:', ressource.type);
                console.log('  - Nom:', ressource.nom_fichier);
                console.log('  - URL:', ressource.url);
            }
        }
        
        // Afficher la structure complète de la première formation
        console.log('\n🔍 Structure complète de la première formation:');
        console.log(JSON.stringify(formation, null, 2));
    }
    
    // Test 2: Statistiques
    console.log('\n📊 Test getStats() - Statistiques des formations:');
    Formation.getStats((err, stats) => {
        if (err) {
            console.error('❌ Erreur getStats():', err.message);
            return;
        }
        
        console.log('✅ Statistiques récupérées:');
        console.log('  - Total formations:', stats[0].total_formations);
        console.log('  - Formations actives:', stats[0].formations_actives);
        console.log('  - Formations inactives:', stats[0].formations_inactives);
        console.log('  - Formations brouillon:', stats[0].formations_brouillon);
        console.log('  - Total chapitres:', stats[0].total_chapitres);
        console.log('  - Total ressources:', stats[0].total_ressources);
        console.log('  - Total PDF:', stats[0].total_pdf);
        console.log('  - Total vidéos:', stats[0].total_videos);
        
        console.log('\n🎉 Tests terminés!');
        process.exit(0);
    });
});

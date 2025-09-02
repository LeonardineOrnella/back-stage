const db = require('./config/db');

console.log('🧪 Test simple de connexion à la base de données...\n');

// Test 1: Connexion à la base
db.query('SELECT 1 as test', (err, results) => {
    if (err) {
        console.error('❌ Erreur de connexion:', err.message);
        return;
    }
    console.log('✅ Connexion à la base réussie');
    
    // Test 2: Vérifier si la table formations existe
    db.query('SHOW TABLES LIKE "formations"', (err, results) => {
        if (err) {
            console.error('❌ Erreur lors de la vérification des tables:', err.message);
            return;
        }
        
        if (results.length === 0) {
            console.error('❌ Table "formations" introuvable');
            return;
        }
        
        console.log('✅ Table "formations" trouvée');
        
        // Test 3: Compter les formations
        db.query('SELECT COUNT(*) as total FROM formation.formations', (err, results) => {
            if (err) {
                console.error('❌ Erreur lors du comptage:', err.message);
                return;
            }
            
            console.log(`✅ Nombre de formations: ${results[0].total}`);
            
            // Test 4: Récupérer une formation
            db.query('SELECT * FROM formation.formations LIMIT 1', (err, results) => {
                if (err) {
                    console.error('❌ Erreur lors de la récupération:', err.message);
                    return;
                }
                
                if (results.length > 0) {
                    console.log('✅ Première formation récupérée:');
                    console.log('  - ID:', results[0].id_form);
                    console.log('  - Titre:', results[0].titre_form);
                    console.log('  - Statut:', results[0].statut_form);
                } else {
                    console.log('⚠️ Aucune formation trouvée');
                }
                
                console.log('\n🎉 Tests terminés!');
                process.exit(0);
            });
        });
    });
});

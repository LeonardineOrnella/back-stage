const db = require('./config/db');

console.log('🔍 Vérification de la structure de la base de données...\n');

// Test 1: Vérifier les tables
console.log('📋 Vérification des tables...');
db.query('SHOW TABLES', (err, results) => {
    if (err) {
        console.error('❌ Erreur lors de la vérification des tables:', err.message);
        return;
    }
    
    console.log('✅ Tables trouvées:');
    results.forEach(row => {
        const tableName = Object.values(row)[0];
        console.log(`  - ${tableName}`);
    });
    
    // Test 2: Vérifier la structure de la table formations
    console.log('\n📚 Structure de la table formations:');
    db.query('DESCRIBE formation.formations', (err, results) => {
        if (err) {
            console.error('❌ Erreur lors de la description de formations:', err.message);
            return;
        }
        
        results.forEach(row => {
            console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
        });
        
        // Test 3: Vérifier la structure de la table chapitres
        console.log('\n📝 Structure de la table chapitres:');
        db.query('DESCRIBE formation.chapitres', (err, results) => {
            if (err) {
                console.error('❌ Erreur lors de la description de chapitres:', err.message);
                return;
            }
            
            if (results.length === 0) {
                console.log('⚠️ Table chapitres introuvable ou vide');
            } else {
                results.forEach(row => {
                    console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
                });
            }
            
            // Test 4: Vérifier la structure de la table ressources
            console.log('\n📎 Structure de la table ressources:');
            db.query('DESCRIBE formation.ressources', (err, results) => {
                if (err) {
                    console.error('❌ Erreur lors de la description de ressources:', err.message);
                    return;
                }
                
                if (results.length === 0) {
                    console.log('⚠️ Table ressources introuvable ou vide');
                } else {
                    results.forEach(row => {
                        console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? 'NOT NULL' : 'NULL'}`);
                    });
                }
                
                // Test 5: Compter les données
                console.log('\n📊 Comptage des données...');
                Promise.all([
                    new Promise((resolve, reject) => {
                        db.query('SELECT COUNT(*) as total FROM formation.formations', (err, results) => {
                            if (err) reject(err);
                            else resolve(results[0].total);
                        });
                    }),
                    new Promise((resolve, reject) => {
                        db.query('SELECT COUNT(*) as total FROM formation.chapitres', (err, results) => {
                            if (err) reject(err);
                            else resolve(results[0].total);
                        });
                    }),
                    new Promise((resolve, reject) => {
                        db.query('SELECT COUNT(*) as total FROM formation.ressources', (err, results) => {
                            if (err) reject(err);
                            else resolve(results[0].total);
                        });
                    })
                ]).then(([formations, chapitres, ressources]) => {
                    console.log(`  - Formations: ${formations}`);
                    console.log(`  - Chapitres: ${chapitres}`);
                    console.log(`  - Ressources: ${ressources}`);
                    
                    // Test 6: Vérifier les relations
                    console.log('\n🔗 Vérification des relations...');
                    db.query(`
                        SELECT 
                            f.id_form,
                            f.titre_form,
                            COUNT(c.id_chap) as nb_chapitres,
                            COUNT(r.id_res) as nb_ressources
                        FROM formation.formations f
                        LEFT JOIN formation.chapitres c ON f.id_form = c.id_form
                        LEFT JOIN formation.ressources r ON c.id_chap = r.id_chap
                        GROUP BY f.id_form, f.titre_form
                    `, (err, results) => {
                        if (err) {
                            console.error('❌ Erreur lors de la vérification des relations:', err.message);
                            return;
                        }
                        
                        console.log('✅ Relations vérifiées:');
                        results.forEach(row => {
                            console.log(`  - ${row.titre_form}: ${row.nb_chapitres} chapitres, ${row.nb_ressources} ressources`);
                        });
                        
                        console.log('\n🎉 Vérification terminée!');
                        process.exit(0);
                    });
                }).catch(err => {
                    console.error('❌ Erreur lors du comptage:', err.message);
                });
            });
        });
    });
});

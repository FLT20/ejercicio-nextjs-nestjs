const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://FLT20:Cancelar123@pruebas.9jbehg8.mongodb.net/Pruebas?retryWrites=true&w=majority&appName=Pruebas';

async function testConnection() {
  console.log('🔍 Probando conexión a MongoDB Atlas...');
  console.log(`URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')}`);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });
    
    console.log('✅ Conexión exitosa!');
    console.log(`📦 Base de datos: ${mongoose.connection.db.databaseName}`);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📋 Colecciones: ${collections.map(c => c.name).join(', ') || '(vacía)'}`);
    
    // Prueba de escritura
    const testCol = mongoose.connection.db.collection('_test');
    await testCol.insertOne({ test: true, timestamp: new Date() });
    const doc = await testCol.findOne({ test: true });
    console.log(`✅ Escritura OK: ${JSON.stringify(doc)}`);
    await testCol.deleteMany({ test: true });
    
    await mongoose.disconnect();
    console.log('🔌 Todo OK!');
    process.exit(0);
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\n🔧 Causas posibles:');
      console.error('  1. Falta /Pruebas en la URI (después del cluster)');
      console.error('  2. Network Access no permite tu IP');
      console.error('  3. Contraseña incorrecta o usuario sin permisos');
      console.error('  4. Caracteres especiales en la contraseña no escapados');
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

testConnection();
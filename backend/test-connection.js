const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://FLT20:Cancelar123@pruebas.9jbehg8.mongodb.net/Pruebas?retryWrites=true&w=majority&appName=Pruebas';

async function testConnection() {
  console.log('[test-connection] Attempting connection to MongoDB Atlas...');
  console.log(
    `[test-connection] URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')}`,
  );

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('[test-connection] Connection successful.');
    console.log(
      `[test-connection] Database: ${mongoose.connection.db.databaseName}`,
    );

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      `[test-connection] Collections: ${collections.map((c) => c.name).join(', ') || '(empty)'}`,
    );

    // Write/read verification
    const testCol = mongoose.connection.db.collection('_test');
    await testCol.insertOne({ test: true, timestamp: new Date() });
    const doc = await testCol.findOne({ test: true });
    console.log(
      `[test-connection] Write verification OK: ${JSON.stringify(doc)}`,
    );
    await testCol.deleteMany({ test: true });

    await mongoose.disconnect();
    console.log('[test-connection] All checks passed. Disconnected.');
    process.exit(0);
  } catch (error) {
    console.error(`[test-connection] ERROR: ${error.message}`);
    if (error.name === 'MongooseServerSelectionError') {
      console.error('[test-connection] Possible causes:');
      console.error(
        '  1. Missing database name in URI (e.g. /Pruebas after the cluster host)',
      );
      console.error(
        '  2. Network Access rules do not allow the current IP',
      );
      console.error(
        '  3. Incorrect credentials or insufficient user permissions',
      );
      console.error(
        '  4. Special characters in the password are not URL-encoded',
      );
    }
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

testConnection();

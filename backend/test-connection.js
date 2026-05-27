const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://FLT20:Cancelar123@pruebas.9jbehg8.mongodb.net/Pruebas?retryWrites=true&w=majority&appName=Pruebas';

const PREFIX = '[test-connection]';

async function testConnection() {
  console.info(
    `${PREFIX} Attempting connection to MongoDB Atlas...`,
  );
  console.info(
    `${PREFIX} URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@')}`,
  );

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.info(`${PREFIX} Connection established.`);
    console.info(
      `${PREFIX} Database: ${mongoose.connection.db.databaseName}`,
    );

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    if (collections.length === 0) {
      console.warn(`${PREFIX} No collections found in database.`);
    } else {
      console.info(
        `${PREFIX} Collections: ${collections.map((c) => c.name).join(', ')}`,
      );
    }

    // Write/read verification
    const testCol = mongoose.connection.db.collection('_test');
    await testCol.insertOne({ test: true, timestamp: new Date() });
    const doc = await testCol.findOne({ test: true });
    console.info(
      `${PREFIX} Write verification passed: ${JSON.stringify(doc)}`,
    );
    await testCol.deleteMany({ test: true });

    await mongoose.disconnect();
    console.info(`${PREFIX} All checks passed. Disconnected.`);
    process.exit(0);
  } catch (error) {
    console.error(`${PREFIX} Connection failed: ${error.message}`);

    if (error.name === 'MongooseServerSelectionError') {
      console.warn(`${PREFIX} Possible causes:`);
      console.warn(
        `${PREFIX}   1. Missing database name in URI (e.g. /Pruebas after the cluster host)`,
      );
      console.warn(
        `${PREFIX}   2. Network Access rules do not allow the current IP`,
      );
      console.warn(
        `${PREFIX}   3. Incorrect credentials or insufficient user permissions`,
      );
      console.warn(
        `${PREFIX}   4. Special characters in the password are not URL-encoded`,
      );
    }

    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

testConnection();

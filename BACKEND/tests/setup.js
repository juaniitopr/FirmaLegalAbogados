const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  // 1. Crear una instancia de MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();
  
  // 2. Obtener la URI de conexión
  const mongoUri = mongoServer.getUri();
  
  // 3. Conectar Mongoose a esta instancia
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // 1. Desconectar Mongoose
  await mongoose.disconnect();
  
  // 2. Detener la instancia de MongoDB en memoria
  await mongoServer.stop();
});

afterEach(async () => {
  // Limpiar todas las colecciones después de cada prueba
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
});
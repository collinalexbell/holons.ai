import mongoose, {Connection} from 'mongoose';


// Connection URL
const LOCAL_BASE = 'mongodb://localhost';

// Database Name
const DB_NAME = 'holonsai';

function getMongoDBUrl(): string {
  return `${LOCAL_BASE}/${DB_NAME}`
}

export function connect(): void {
  mongoose.connect(getMongoDBUrl())
}

let isOpen = false;

mongoose.connection.on('open', () => {
  isOpen = true;
});

export function getConnection(): Connection {
  return mongoose.connection;
}


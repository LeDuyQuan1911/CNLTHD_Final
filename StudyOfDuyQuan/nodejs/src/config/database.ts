// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
const getConnection = async () => {
  const connection = await mysql.createConnection({
    port: 8111,
    host: 'localhost',
    user: 'ldq123123',
    password: '123456',
    database: 'nodejspro',
  });

  return connection;

}

export {getConnection};
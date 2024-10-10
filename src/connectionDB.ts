import sql from 'mssql';

// const envServer = ():string => {
//     if (process.env.DB_HOST !== undefined) {
//         return process.env.DB_HOST
//     };
//     return ''
// }
// SQL Server configuration
const sqlConfig: sql.config = {
  user: "edu",       // Your database user
  password: "254254", // Your database password
  database: "AppExtensao",     // Your database name
  server: "BOOK-3DOVOPTT7H",     
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, 
    trustServerCertificate: true, 
  },
};

export async function connectToDatabase() {
  try {
    const pool = await sql.connect(sqlConfig);
    console.log('Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('Database connection failed: ', err);
    throw new Error('Database connection failed');
  }
}
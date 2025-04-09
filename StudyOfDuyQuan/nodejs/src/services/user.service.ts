import { getConnection } from "../config/database";

const handleCreateUser = async (name:string, email:string, address:string) => {
  const connection = await getConnection(); 
  try {
    const sql = 'INSERT INTO `users` (`name`, `email`, `address`) VALUES (?, ?, ?)';
    const values = [name, email, address];
    const [results, fields] = await connection.query(sql, values);
    return results; // Return the results
  } catch (err) {
    console.log(err);
    return [];
  }
}

const getAllUsers = async () => {
    const connection = await getConnection(); 
    try {
        const [results, fields] = await connection.query(
          'SELECT * FROM `users`'
        );
        return results; // Return the results
      } catch (err) {
        console.log(err);
        return [];
      }
}

export {handleCreateUser,getAllUsers};
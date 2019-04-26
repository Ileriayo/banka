import db from '../db/db';
import Tokenizer from '../Helper/tokenizer';
import hashPassword from '../Helper/hashPassword';
import EmailExistDB from '../Helper/emailExist';

const { tokenizer } = Tokenizer;
const { emailExistDB } = EmailExistDB;

class userController {
  static async signUp(req, res) {
    const insertUser = `INSERT INTO users(email, firstname, lastname, password, type, isadmin)
                        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingUser = await emailExistDB(email);
    // console.log(existingUser);
    if (existingUser) {
      res.status(409).json({
        status: 409,
        error: 'Email already exists',
      });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const data = await db.query(insertUser, [email, firstName, lastName, hashedPassword, 'client', false]);
    const { id } = data.rows[0];
    const token = tokenizer({ id, email });
    res.status(201).json({
      status: 201,
      message: 'Sign up successful',
      data: {
        token, id: data.rows[0].id, email, firstName, lastName, type: data.rows[0].isadmin,
      },
    });
  }
}

export default userController;

import { validationResult } from 'express-validator/check';
import Query from '../db/db';
import Tokenizer from '../Helper/tokenizer';
import hashPassword from '../Helper/hashPassword';
import CheckEmail from '../Helper/checkEmail';
import CheckPassword from '../Helper/checkPassword';

const { tokenizer } = Tokenizer;
const { checkEmail } = CheckEmail;
const { checkPassword } = CheckPassword;
const { query } = Query;

class userController {
  static async signUp(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const insertUser = `INSERT INTO users(email, firstname, lastname, password, type, isadmin)
                        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    const {
      email, firstName, lastName, password,
    } = req.body;
    const existingUser = await checkEmail(email);
    if (existingUser) {
      return res.status(409).json({
        status: 409,
        error: 'Email already exists',
      });
    }
    if (!existingUser[0]) {
      const hashedPassword = await hashPassword(password);
      const data = await query(insertUser, [email, firstName, lastName, hashedPassword, 'client', false]);
      const { id } = data.rows[0];
      const token = await tokenizer({ id, email });
      return res.status(201).json({
        status: 201,
        message: 'Sign up successful',
        data: {
          token, id: data.rows[0].id, email, firstName, lastName, type: data.rows[0].isadmin,
        },
      });
    }
  }

  static async signIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }
    const { email, password } = req.body;
    const validUser = await checkEmail(email);
    if (validUser.length <= 0) {
      return res.status(404).json({
        status: 404,
        error: 'User does not exist',
      });
    }
    const validPassword = await checkPassword(password, validUser[0].password);
    if (!validPassword) {
      return res.status(401).json({
        status: 401,
        error: 'Incorrect password',
      });
    }
    const { id, firstname, lastname } = validUser[0];
    const token = await tokenizer({ id, email });
    return res.status(200).json({
      status: 200,
      message: 'Sign in successful',
      data: {
        token, id, email, firstname, lastname,
      },
    });
  }
}

export default userController;

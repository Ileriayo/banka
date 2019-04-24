import db from '../db/index';

class transactionController {
  static async viewTransactions(req, res) {
    const getAllTransactions = 'SELECT * FROM users LIMIT 100';
    try {
      const { rows } = await db.query(getAllTransactions);
      return res.status(200).json({ Status: 200, data: rows });
    } catch (err) {
      return res.status(400).json({ Status: 400, Error: err });
    }
  }
}


export default transactionController;

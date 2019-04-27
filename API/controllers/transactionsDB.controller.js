import Query from '../db/db';

const { query } = Query;

class transactionController {
  static async viewAllTransactions(req, res) {
    const getAllTransactions = 'SELECT * FROM transactions LIMIT 100';
    try {
      const { rows } = await query(getAllTransactions, []);
      return res.status(200).json({ Status: 200, data: rows });
    } catch (err) {
      return res.status(400).json({ Status: 400, Error: err });
    }
  }
}

export default transactionController;

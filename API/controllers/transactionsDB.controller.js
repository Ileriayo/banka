import Query from '../db/db';

const { query } = Query;

class transactionController {
  static async viewOneTransaction(req, res) {
    const { transactionId } = req.params;
    // Check that the right user checks his transaction
    const getOneTransaction = 'SELECT * FROM transactions WHERE id = $1';
    try {
      const result = await query(getOneTransaction, [transactionId]);
      const data = result.rows[0];
      return res.status(200).json({ Status: 200, data });
    } catch (err) {
      return res.status(400).json({ Status: 400, Error: err });
    }
  }
}

export default transactionController;

import Query from '../db/db';

const { query } = Query;

class SelectWithClause {
  static async selectWithClause(table, field, value) {
    try {
      const queryString = `SELECT * FROM ${table} WHERE ${field} = $1`;
      const data = await query(queryString, [value]);
      // if (!data) return [];
      return data.rows;
    } catch (err) {
      return err;
    }
  }
}

export default SelectWithClause;

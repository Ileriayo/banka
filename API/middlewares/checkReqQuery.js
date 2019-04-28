import SelectWithClause from '../Helper/selectWithClause';

const { selectWithClause } = SelectWithClause;

class CheckReqQuery {
  static async checkReqQuery(req, res, next) {
    try {
      const table = 'accounts';
      const queryParams = req.query;
      const queryParamsStatus = queryParams.status;
      if (Object.keys(queryParams).length <= 0) {
        return next();
      }
      if (queryParamsStatus !== undefined) {
        const data = await selectWithClause(table, 'status', queryParamsStatus);
        if (data.length <= 0) return res.status(200).json({ status: 200, data });
        return res.status(200).json({ status: 200, data });
      }
      return res.status(400).json({ status: 400, error: 'Invalid query' });
    } catch (err) {
      return res.status(400).json({ status: 400, error: err });
    }
  }
}

export default CheckReqQuery;

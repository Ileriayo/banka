import allAccounts from '../utils/accounts';

class adminController {
    static viewAllAccounts (req, res) {
        res.json({
            status: 200,
            data: allAccounts,
        }).status(200);
    }
}

export default adminController;
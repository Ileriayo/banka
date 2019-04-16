import userData from '../utils/data';

class userController {
  static signIn(req, res) {
    const { email, password } = req.body;
    const user = userData.find(u => u[0].email === email && u[0].password === password);
    if (user === null) {
      return res.json({
        message: 'no user found',
      }).status(404);
    }
    return res.json({
      message: 'success',
      data: user,
    }).status(200);
  }
}

export default userController;

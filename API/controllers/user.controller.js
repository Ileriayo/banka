import userData from '../utils/data';

class userController {
  static signIn(req, res) {
    const { email, password } = req.body;
    const userA = userData.filter(user => user.email === email && user.password === password);
    if (!userA) {
      return res.json({
        status: 404,
        message: 'no user found',
      }).status(404);
    }
    return res.json({
      message: 'success',
      data: userA,
    }).status(200);
  }
}

export default userController;

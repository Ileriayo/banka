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

  static signUp(req, res) {
    const { email } = req.body;
    const user = userData.find(u => u.email === email);
    if (!user) {
      userData.push(req.body);
      return res.json({
        status: 201,
        data: userData[userData.length - 1],
      }).status(201);
    }
    return res.json({
      status: 400,
      error: 'email already exists',
    }).status(400);
  }
}

export default userController;

import userData from '../utils/data';

class userController {
  static signIn(req, res) {
    const { email, password } = req.body;
    const user = userData.find(u => u.email === email);
    if (email == null || password === null) {
      return res.json({
        status: 400,
        error: 'All fields are required',
      }).status(400);
    }
    if (!user) {
      return res.json({
        status: 403,
        error: 'Email does not exist',
      }).status(403);
    }
    if (user.password !== password) {
      return res.json({
        status: 403,
        error: 'Incorrect Password',
      }).status(403);
    }
    return res.json({
      status: 200,
      data: user,
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

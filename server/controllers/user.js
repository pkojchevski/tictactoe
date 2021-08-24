const User = require('../models/user');

exports.login = (req, res) => {
    const { username } = req.body;
    if(username.length === 0) {
        console.log('username does not exist')
        return res.status(400).json({message:"Please fullfill username"})
    } else {
        User.findOne({username}, (err, user) => {
            if(!err && user) {
                res.json(user);
            } else {
                return res.status(400).json({message:"Username not found"});
            }
        })
    }

}

exports.checkIfUsernameIsUnique = (req, res) => {
    // find user based on email
    const { username } = req.body;
    if(username.length === 0) {
    return res.status(400).json({message:"Please fullfill username"})

    }
    let exists = false
    User.find({}, (err, users) => {
        if(users && users.length > 0) {
            users.forEach(user => {
                if (user.username == username) {
                    exists = true
                }
            })
            if(exists) {
                return res.status(200).json({userNameExists: true});
            } else {
                return res.status(200).json({userNameExists: false});
            }
        } else {
            return res.status(200).json({userNameExists: false});
        }
    })
}

exports.saveUsername = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({ Error: 'Can not save the username' });
      } else {
        return res.status(200).json({ user });
      }
    });
  };


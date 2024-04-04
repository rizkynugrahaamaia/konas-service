const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      nik: req.body.nik,
      password: bcrypt.hashSync(req.body.password, 8),
      regional: req.body.regional,
      presence: req.body.presence
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });

      const result = user.setRoles(roles);
      if (result) res.send({ message: "User registered successfully!" });
    } else {
      // user has role = 1
      const result = user.setRoles([1]);
      if (result) res.send({ message: "User registered successfully!" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        nik: req.body.nik,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    // create the token as a key that user can use to hit endpoints and verify user as a correct user
    const token = jwt.sign({ id: user.id },
                           config.secret,
                           {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                            expiresIn: 86400, // 24 hours
                           });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    // req.session.token = token;

    // set a cookie on the response header 

    // return res.status(200).send({
    //   id: user.id,
    //   username: user.username,
    //   nik: user.nik,
    //   regional: user.regional,
    //   presence: user.presence,
    //   roles: authorities,
    //   token: token
    // });

    return res
		.status(200)
		.cookie('token', token, {
      httpOnly: true,
			// sameSite: 'strict',
			// path: '/api/auth/signin',
			expires: new Date(new Date().getTime() + 100 * 50)
		}).send({
      id: user.id,
      username: user.username,
      regional: user.regional,
      roles: authorities
    })

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.cookies = null;
    return res.status(200).clearCookie('token').send({
      message: "You've been signed out!"
    });
  } catch (err) {
    this.next(err);
  }
}
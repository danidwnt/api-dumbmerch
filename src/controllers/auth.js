const { user } = require('../../models')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {

    const data = req.body

    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        status: Joi.string().required()
    })

    const { error } = schema.validate(data)

    if (error) {
        console.log(error);
        return res.status(400).send({
            status: "failed",
            message: error.details[0].message,
        })
    }

    const isAlready = await user.findOne({
        where: {
            email: data.email,
        },
    });

    if (isAlready) {
        return res.send({
            error: {
                message: `Account ${data.email} is Already`,
            },
        });
    }

    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            status: req.body.status,
        })

        res.status(201).send({
            status: 'success',
            data: {
                name: newUser.name,
                email: newUser.email,
                token: newUser.password,
                // status : newUser.status
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: error.details[0].message,
        })

    }
}


exports.login = async (req, res) => {

    // blueprint validasi 
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
    })

    //cek data dengan validasi
    const { error } = schema.validate(req.body)

    if (error) {
        return res.status(400).send({
            status: "error",
            message: error.details[0].message,
        })
    }

    try {

        const userExist = await user.findOne({
            where: {
                email: req.body.email,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        const isValid = await bcrypt.compare(req.body.password, userExist.password);

        if (!isValid) {
            return res.status(400).send({
                error: {
                    message: 'Email or Password not match!',
                },
            });
        }

        const payload = {
            status : userExist.status,
          };
          const SECRET_KEY = process.env.TOKEN_KEY
      
          const token = jwt.sign(payload, SECRET_KEY);
 
        res.status(200).send({
            message: 'Login success',

            user: {
                name: userExist.name,
                email: userExist.email,
                // status : userExist.status,
                token : token,
                //   status: userExist.status
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: "failed",
            message: "Server Error",
        });
    }
};


// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJzdGF0dXMiOiJjdXN0b21lciIsImlhdCI6MTY0OTMyMTgxNH0. //customer
// BCXLoQu2Qf3yLvv-4XdvByyBeqdj22vxZH2D78U28l8"

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJzdGF0dXMiOiJzZWxsZXIiLCJpYXQiOjE2NDkzMjI1ODB9. //seller
// kDOlrZyRxilCx4dSou0GTe4OGXTcJw89U2XGd8G4AtI"

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
// eyJzdGF0dXMiOiJzZWxsZXIiLCJpYXQiOjE2NDkzMjI2NzJ9. //seller
// ZIjgrtJH1RmEm7LdkUSWuTpbSHxgNt9RRWp6mX1sgMc"
const { user } = require('../../models')

const Joi = require('joi')
const { status } = require('express/lib/response')

exports.register = async (req, res) => {
    try {
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

        await user.create(data);

        res.status(201).send({
            status: 'success',
            data: {
                name: data.name,
                email: data.email,
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
    // code here
    try {
      const data = req.body
  
      // blueprint ketentuan 
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required()
      })
  
      //cek data dengan ketentuan
      const { error } = schema.validate(data)
  
      if (error) {
        return res.status(400).send({
          status: "error",
          message: error.details[0].message,
        })
      }
  
      const userExist = await user.findOne({
        where: {
          email: data.email,
          password: data.password
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      })
  
      if (!userExist) {
        return res.status(400).send({
          status: "failed",
          message: `Email or Password not match!`,
        })
      }
  
      res.status(200).send({
        message: 'Login success',
        user : {
          name: userExist.name,
          email: userExist.email,
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
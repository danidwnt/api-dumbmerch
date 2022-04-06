const { user, profile, product } = require("../../models");

exports.addUsers = async (req, res) => {
  try {
    await user.create(req.body)

    res.send({
      status: 'success',
      message: 'Add user finished',

    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });

    res.send({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params

    const data = await user.findAll({
      where: {
        id
      },
      include: {
        model: profile,
        as: "profile",
        attributes: {
          exclude: ['idUser', 'createdAt', 'updatedAt']
        }
      },

      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: {
        user: data
      }
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
};

exports.getUsersProducts = async (req, res) => {
  try {


    const data = await user.findAll({
      where: {
        status: "seller"
      },

      include: {
        model: product,
        as: "products",
        attributes: {
          exclude: ['idUser', 'createdAt', 'updatedAt']
        }
      },

      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    })

    res.send({
      status: 'success',
      data: {
        user: data
      }
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
};

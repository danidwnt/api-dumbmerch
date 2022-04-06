const { product, user, category, categoryproducts } = require('../../models')


exports.getProducts = async (req, res) => {
  try {
    const data = await product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser']
      }
    })

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.addProduct = async (req, res) => {
  try {
    const data = req.body

    await product.create(data)

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.getProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const data = await product.findOne({
      include: {
        model: user,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        }
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser']
      },
      where: {
        id,
      },
    })

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.update(req.body, {
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Update product id: ${id} finished`,
      data: req.body,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      message: `Delete product id: ${id} finished`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
}

exports.getProductsUser = async (req, res) => {
  try {
    const data = await product.findAll({
      include: {

        model: user,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password']
        }
      },//relasi ke foreignKey user



    })

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.getProductsCategory = async (req, res) => {
  try {
    const data = await product.findAll({
      include:

      //relasi ke foreignKey user
      {
        model: category,
        as: "categories",
        through: {
          model: categoryproducts,
          as: "bridge",
          attributes: []
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },


      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser']
      }
    })

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}

exports.getProductsAll = async (req, res) => {
  try {
    const data = await product.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password']
          }
        },//relasi ke foreignKey user
        {
          model: category,
          as: "categories",
          through: {
            model: categoryproducts,
            as: "bridge",
            attributes: []
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt']
          }
        }

      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser']
      }
    })

    res.send({
      status: 'success...',
      data
    })
  } catch (error) {
    console.log(error)
    res.send({
      status: 'failed',
      message: 'Server Error'
    })
  }
}
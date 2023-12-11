const { flash } = require("express-flash-message");
const CustomerModel = require("../Models/CustomerModel");









//homepage
exports.homepage = async (req, res) => {
  let messages = await req.consumeFlash('info')
  let locals = {
    title: ' NodeJS ',
    description: 'Free NodeJs User Management System'
  };

  let perPage = 5;
  let page = req.query.page || 1




  try {
    const customers = await CustomerModel.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec()

    const count = await CustomerModel.count()
    res.render('index', {
      locals, messages, customers,
      current: page, pages: Math.ceil(count / perPage)
    })

  } catch (error) {
    res.render('index', { locals, messages })

    console.log(error)
  }
}











// exports.homepage = async (req, res) => {
//   let messages = await req.consumeFlash('info')
//   let locals = {
//     title: ' NodeJS ',
//     description: 'Free NodeJs User Management System'
//   };

//   try {
//     const customers = await CustomerModel.find({})

//      res.render('index', { locals, messages, customers })

//   } catch (error) {
//     res.render('index', { locals, messages })

//     console.log(error)
//   }

// }


//adding customer
exports.addCustomer = async (req, res) => {
  let locals = {
    title: 'Add New Customer -NodeJS',
    description: 'Free NodeJs User Management System'
  };
  res.render('customer/add', locals)


}

















//create customer
exports.postCustomer = async (req, res) => {

  try {
    const result = await CustomerModel.create(req.body)
    if (result) {
      await req.flash('info', 'New customer has been added.')
      res.redirect('/')
    }

  } catch (error) {
    console.log(error)
  }
}



exports.aboutPage=async(req,res)=>{
  let locals = {
    title: 'About Developer -NodeJS',
    description: 'Free NodeJs User Management System'
  };
  try {
    res.render('customer/about',locals)
  } catch (error) {
    console.log(error)
  }

}






















//finding customer by id
exports.getCustomerById = async (req, res) => {


  let locals = {
    title: 'Edit Customer Data -NodeJS',
    description: 'Free NodeJs User Management System'
  };
  try {
    const customer = await CustomerModel.find({ _id: req.params.id })


    res.render('customer/edit', { locals, customer: customer[0] })


  } catch (error) {
    console.log(error)
  }
}




//update customer
exports.editPost = async (req, res) => {



  try {

    // await CustomerModel.findOneAndUpdate({
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   phone: req.body.phone,
    //   email: req.body.email,
    // }).where(req.params.id)
    // res.redirect('/')

      await CustomerModel.updateOne({_id:req.params.id},req.body)


        res.redirect('/')


  } catch (error) {
    console.log(error)
  }
}








//delete customer

exports.deleteCustomer = async (req, res) => {


  try {
    await CustomerModel.deleteOne({ _id: req.params.id })
    res.redirect('/')

  } catch (error) {
    console.log(error)
  }
}




//view customer
exports.viewCustomerById = async (req, res) => {

  let locals = {
    title: 'View Customer -NodeJS',
    description: 'Free NodeJs User Management System'
  };
  try {
    const customer = await CustomerModel.find({ _id: req.params.id })


    res.render('view', { locals, customer: customer[0] })


  } catch (error) {
    console.log(error)
  }
}








//search Item by firstName or lastName
exports.searchItem = async (req, res) => {
  let locals = {
    title: 'Search Customer Data -NodeJS',
    description: 'Free NodeJs User Management System'
  };

  try {
    let searchTerm = req.body.searchTerm
    let noSpecialCharSearch = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

    const customer = await CustomerModel.find({
      $or: [
        { firstName: { $regex: new RegExp(noSpecialCharSearch, 'i') } },
        { lastName: { $regex: new RegExp(noSpecialCharSearch, 'i') } },
      ]
    })

    res.render('search', {
      customer, locals
    })
  } catch (error) {
    console.log(error)
  }
}


 







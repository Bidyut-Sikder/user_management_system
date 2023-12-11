const express = require('express');
const { homepage, addCustomer, postCustomer,editPost, viewCustomerById, getCustomerById, deleteCustomer, searchItem, aboutPage } = require('../Controllers/customerController');


const router = express.Router()




router.get('/',homepage)
router.get('/add',addCustomer)


router.get('/view/:id',viewCustomerById)
router.get('/edit/:id',getCustomerById)
router.put('/edit/:id',editPost)
router.post('/post',postCustomer)
router.delete('/edit/:id',deleteCustomer)
router.post('/search',searchItem)

router.get('/about',aboutPage)



//view
 




 
module.exports=router;























































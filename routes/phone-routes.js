const express=require('express');
const router=express.Router();
const phoneController=require('./controllers/phone-controller')
const {check}=require('express-validator')


router.get('/:pid',phoneController.getphoneById)
router.post('/',phoneController.createphone)
// router.patch('/:pid',[check('expertise').not().isEmpty(),
// check('des').isLength({min:5}),check('image').not().isEmpty()],phoneController.updatephoneById)
router.delete('/:pid',phoneController.deletephoneById)
router.patch('/:pid',[check('name').not().isEmpty(),
check('price').not().isEmpty(),
check('brand').not().isEmpty(),check('portfolio').not().isEmpty(),check('image').not().isEmpty()],phoneController.updatephoneById)
router.get('/',phoneController.getAllphone)


module.exports=router
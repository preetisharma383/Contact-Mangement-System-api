import express from 'express'
//contact routes
const router=express.Router();

import { verifyUser } from '../middleware/verifyUser.middleware.js';
import { createContact, deleteContact, getContactById, getContacts, updateContact } from '../controller/contact.controller.js';

router.post('/add-contact',verifyUser,createContact)
router.get('/contacts',verifyUser,getContacts)
router.get('/contact/:id',verifyUser,getContactById)
router.put('/update-contact/:id',verifyUser,updateContact)
router.delete('/contact/:id',verifyUser,deleteContact)
export {router}
import express from 'express'
import { ContactModel } from '../models/contact.model.js'

export const createContact = async (req, res) => {
  try {
    // console.log("User:", req.user);
    // console.log("Body:", req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const contact = await ContactModel.create({
      name,
      email,
      phone,
      address: req.body.address,
      postedBy: req.user._id
    });


    res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error("createContact error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ postedBy: req.user._id });
    return res.status(200).json({ success: true, contacts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await ContactModel.findOne({
      _id: req.params.id,
      postedBy: req.user._id
    });

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({ success: true, contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateContact = async (req, res) => {
  try {
   const {id}=req.params;
   if(!id){
    return res.status(401).json({error:"No  id specified"})
   }

    const updatedContact = await ContactModel.findByIdAndUpdate(
    {_id:id},{...req.body},{new:true}
    );

    if (!updatedContact) {
      return res.status(404).json({
      
        success: false,
        message: "Contact not found"
      });
    }

    res.status(200).json({
      success: true,
      contact: updatedContact
    });

  } catch (error) {
    console.error("updateContact error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Contact ID is required"
      });
    }

    const deletedContact = await ContactModel.findOneAndDelete({
      _id: id,
      postedBy: req.user._id
    });

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found or not authorized"
      });
    }

    const contacts = await ContactModel.find({
      postedBy: req.user._id
    });

    return res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      contacts
    });

  } catch (error) {
    console.error("deleteContact error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

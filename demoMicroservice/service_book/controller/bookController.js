const express = require('express'); 
const { Book } = require('../model/Book'); // import model
const postBook = async (req, res) => {
    const { title, author, publishedDate } = req.body; 
    const result =  await Book.create({ title, author, publishedDate }); 
    res.status(201).json({ 
        message: 'Book created successfully', 
        data: result }); 
}

const getBook = async (req, res) => {
    const result = await Book.find({});
    res.status(200).json({ 
        message: 'Get all books successfully', 
        data: result });
}

const updateBook = async (req, res) => {
    const { id, title, author, publishedDate } = req.body; 
    const result = await Book.findByIdAndUpdate(id, { title, author, publishedDate }, { new: true }); 
    res.status(200).json({ 
        message: 'Book updated successfully', 
        data: result }); 
}

const deleteBook = async (req, res) => {
    const { id } = req.body; 
    const result = await Book.findByIdAndDelete(id);
    res.status(200).json({ 
        message: 'Book deleted successfully', 
        data: result });
}

module.exports = {
    postBook, getBook, updateBook, deleteBook
}
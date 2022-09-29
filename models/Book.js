const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imageSrc: {
		type: String,
		required: true
	},
	genre: [String]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

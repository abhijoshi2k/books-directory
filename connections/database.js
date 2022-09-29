const mongoose = require('mongoose');

mongoose
	.connect(
		'mongodb+srv://test-user:test-pass@abhijoshi2k.ix9pn.mongodb.net/books_directory?retryWrites=true&w=majority'
	)
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.error('Could not connect to MongoDB...', err));

require('dotenv').config();

const express = require('express');
const app = express();

require('./connections/database');

const Book = require('./models/Book');

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
	let query = { genre: req.query.genre };

	if (!req.query.genre || req.query.genre == 'all' || req.query.genre == '') {
		query = {};
	}

	const books = await Book.find(query);

	res.render('index', {
		books: books,
		currentGenre: query.genre ? query.genre : 'all'
	});
});

app.delete('/', async (req, res) => {
	await Book.findByIdAndDelete(req.body.id);
	res.status(200).send({ message: 'Book deleted successfully' });
});

app.get('/addBook', (req, res) => {
	res.render('addBook');
});

app.post('/addBook', async (req, res) => {
	const book = new Book({
		title: req.body.title,
		description: req.body.description,
		imageSrc: req.body.imageSrc,
		genre: req.body.genre
	});

	await book.save();

	res.redirect('/');
});

app.get('/editBook/:id', async (req, res) => {
	const id = req.params.id;
	const book = await Book.findById(id);

	res.render('editBook', { book: book });
});

app.post('/editBook/:id', async (req, res) => {
	const id = req.params.id;

	await Book.findByIdAndUpdate(id, {
		title: req.body.title,
		description: req.body.description,
		imageSrc: req.body.imageSrc,
		genre: req.body.genre
	});

	res.redirect('/');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

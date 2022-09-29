function deleteBook(id) {
	if (confirm('Are you sure you want to delete this book?')) {
		fetch('/', {
			method: 'delete',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				id: id
			})
		})
			.then((res) => {
				if (res.ok) {
					document.getElementById(id).remove();
				} else {
					alert('Something went wrong');
				}
			})
			.catch((err) => alert('Something went wrong'));
	}
}

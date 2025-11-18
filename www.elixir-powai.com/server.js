const express = require('express');
const compression = require('compression');
const path = require('path'); // Import path module
const app = express();
const port = 3000;

// Enable gzip/Brotli compression
app.use(compression());

app.use(express.static('.')); // Serve static files from the current directory

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'), (err) => {
		if (err) {
			res.status(err.status).end(); // Handle errors
		}
	}); // Serve index.html on root request
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express')
const app = express();

const PASSWORD = 'sup3rs3cr3t';

app.use((req, res, next) => {
	req.authenticated = req.url.includes(PASSWORD);
	next();
});

app.use((req, res) => {
	if (req.authenticated) {
		res.send('Bienvenido');
	} else {
		res.send(401);
	}
});

//console.log(require.main);
if (require.main === module) {
	app.listen(3000)
} else {
	module.exports = app;
}


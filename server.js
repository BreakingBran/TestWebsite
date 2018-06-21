const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
var app = express();

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + "\n",(err) => {
		if(err){
			console.log('Unable to append to server.log\n')
		}
	}); 
	next()
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs', {
// 		Message: "Sorry we are undergoing some maintenance we will be back soon",
// 		pageTitle: 'Sorry Were under maintenance :(',
// 	});
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {return new Date().getFullYear()});

hbs.registerHelper('screamText',(text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	// res.send('<h1>Hello Lance!</h1>')
	// res.send({
	// 	name: 'Lance',
	// 	age: -2,
	// 	cool: 'Yes'
	// })
	res.render('home.hbs', {
		Message: "I love you lance, you are my best friend",
		pageTitle: 'Home Page',
	});
});

app.get('/about', (req, res) => {
	// res.send('<h1>Hello Lance!</h1>')
	// res.send({
	// 	name: 'Lance',
	// 	age: -2,
	// 	cool: 'Yes'
	// })
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		Error: 'Bad Request',
		req: 'Bad request'
	})
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`)
});
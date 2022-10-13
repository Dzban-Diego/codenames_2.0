const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const recordRoutes = require('./routers/codenames');
const path = require('path');
require('dotenv').config()

//if (process.env.NODE_ENV === 'production') {
// Serve any static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle React routing, return all requests to React app

//}


const dbURL = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.ig7dx.mongodb.net/codenames?retryWrites=true&w=majority`;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true})
    .then((result) => app.listen(process.env.PORT || 8080))
    .catch((err) => console.log(err));
//

app.set('view engine','ejs')

app.use(express.urlencoded({extended: true,}))
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
  });

//app.get('/', (req,res) => {
//	res.render('app')
//})

app.use('/codenames', recordRoutes)

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

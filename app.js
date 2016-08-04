const PORT = 8000;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const path = require('path');


const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/', (req, res, next) =>{
  let filepath = path.join(__dirname, 'index.html');
  res.sendFile(filepath);
})

app.route('/addressBook')
   .get((req, res) => {
      Person.getAll((err, people) => {
        if(err){
          res.status(400).send(err);
        } else {
          res.send(people);
        }
      });
   })
   .post((req, res) => {
      Person.create(req.body, function(err, person){
        console.log("person:", person)
        if (err) return res.status(400).send(err);
        res.send(person);
      })
   })
app.route('/addressBook/:id')
   .get((req, res) =>{
     Person.getOne(req.params.id, function(err, person){
       if (err) return res.status(400).send(err)
       res.send(person)
     })
   })
   .put((req, res) =>{
     Person.update(req.params.id, req.body, function(err){
       res.send(err)
     })
   })
   .delete((req, res) => {
     Person.delete(req.params.id, function(err){
       res.send(err);
     })
   })
app.listen(PORT, err => {
  console.log(err || `Server is listening on port ${PORT}`)
});

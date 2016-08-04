const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const dataFilePath = path.join(__dirname, '../data/person.json')

exports.getAll = function(cb){
  fs.readFile(dataFilePath, (err, buffer) =>{
    if (err) return cb(err)

    let people;

    try{
      people = JSON.parse(buffer);
    } catch(err) {
      return cb(err);
    }
    cb(null, people)
  });
}

exports.create = function(personObj, cb){
  this.getAll(function(err, people){
    if (err) return cb(err);
    personObj.id = uuid.v4();
    people.push(personObj);
    fs.writeFile(dataFilePath, JSON.stringify(people), function(err){
      if (err) return cb(err);
      cb(null, personObj);
    })
  //  console.log('people:', personObj)
  })
}

exports.delete = function(personId, cb){
  this.getAll(function(err, people){
    if (err) return cb(err);
    people.map((person, index) =>{
      if(person.id === personId){
        person.splice(index, 1);
        fs.writeFile(dataFilePath, JSON.stringify(cats), function(err){
          cb(err);
        })
      }
    })
  })
}

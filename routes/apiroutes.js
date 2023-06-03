// LOAD DATA
//linking routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

const fs = require('fs');

module.exports = function (app) {
  // API GET Request
  app.get('/api/notes', function (req, res) {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      const dbData = JSON.parse(data);
      res.send(dbData);
    });
  });

  // API POST Request
  app.post('/api/notes', function (req, res) {
    const userNotes = req.body;

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      let dbData = JSON.parse(data);
      dbData.push(userNotes);
      let number = 1;
      dbData.forEach((note, index) => {
        note.id = number;
        number++;
      });
      console.log(dbData);

      const stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.send('Thank you for your note!');
  });

  // API DELETE Request
  app.delete('/api/notes/:id', function (req, res) {
    const deleteNote = req.params.id;
    console.log(deleteNote);

    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;

      let dbData = JSON.parse(data);
      for (let i = 0; i < dbData.length; i++) {
        if (dbData[i].id === Number(deleteNote)) {
          dbData.splice(i, 1);
        }
      }
      console.log(dbData);
      const stringData = JSON.stringify(dbData);

      fs.writeFile('./db/db.json', stringData, (err, data) => {
        if (err) throw err;
      });
    });
    res.sendStatus(204);
  });
};


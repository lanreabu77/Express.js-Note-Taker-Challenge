

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3001;


// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.static('public'));

// require('./routes/apiroutes')(app);
// require('./routes/htmlroutes')(app);

// app.listen(PORT, function() {
//   console.log(`Server is listening on PORT: ${PORT}`);
// });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const apiRoutes = require('./routes/apiroutes');
const htmlRoutes = require('./routes/htmlroutes');

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
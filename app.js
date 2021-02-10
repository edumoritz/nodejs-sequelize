const app = require('express')();
const consign = require('consign');


consign({ verbose: false })
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./services')
    .then('./routes')
    .then('./config/router.js')
    .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use((err, req, res, next) => {
  const { name, message, stack } = err;
  if( name === 'ValidationError' ) res.status(400).json({error: message})
  else {
      console.log(message);
      res.status(500).json({name, message, stack});
  }

  next(err);
})

module.exports = app;
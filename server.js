const app = require('./app');
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Aplicação está no ar: ${port}`);
});
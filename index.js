const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./src/configs/sequelize');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));
app.use(express.static('node_modules'));

db.sequelize.sync({ alter: true }).then(() => {
    console.log("Base de dados criada com sucesso")
})

require('./src/registro/routes')(app)

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html");
})

app.get("/registro", (req,res) => {
    res.sendFile(__dirname + "/public/views/registro.html")
})

app.get("/consulta", (req,res) => {
    
    res.sendFile(__dirname + "/public/views/consulta.html")

})


var server = app.listen(3000, () => {
    console.log('Servidor está rodando na porta ' + server.address().port + ' no host ' + server.address().address);
})

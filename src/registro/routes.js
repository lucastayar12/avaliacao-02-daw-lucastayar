module.exports = (app) => {
    const controller = require('../registro/controller');

    //ADICIONA UM NOVO MENINO !!
    app.post('/registro', controller.create)

    //CONSULTA OS MENINU !!
    app.post('/consulta', controller.consulta)

    //DELETA O MENINU !!
    app.delete('/consulta', controller.delete)

    //EDITA MEMINU
    app.put('/edita', controller.update)

    app.post('/edita', controller.consultacpf)

}
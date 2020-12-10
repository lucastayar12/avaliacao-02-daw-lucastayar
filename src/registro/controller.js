const db = require('./../configs/sequelize')
const Registro = require('../registro/model')

exports.create = (req, res) => {
    Registro.create({
        nome: req.body.nome,
        cpf: req.body.cpf,
        dat_Nasc: req.body.dat_Nasc,
        tel: req.body.tel,
        profissao: req.body.profissao,
        escolaridade: req.body.escolaridade,
        habilidade: req.body.habilidade
    }).then((registro) => {
        res.send(registro);
    }).catch((err) => {
        console.log("Erro: " + err);
    })
}

exports.consulta = (req, res) => {

    Registro.findOne({
        where: {
            nome: req.body.nome,
            cpf: req.body.cpf,
            dat_Nasc: req.body.dat_Nasc
        }
    }).then((data) => {
        res.send(data);
    }).catch((err) => {
        console.log("Dado não encontrado!" + err)
    })


}

exports.delete = (req,res) => {
    Registro.destroy({
        where : {
            id : req.body.id
        }
    }).then((affectedRows) => {
        res.send({'message' : 'ok' , 'affectedRows' : affectedRows});
    })
}

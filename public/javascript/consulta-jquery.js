Registros = {

    add: () => {
        var t = {};

        t.nome = $("#nome").val();
        t.cpf = $("#cpf").val();
        t.tel = $("#tel").val();
        t.dat_Nasc = $("#dat_Nasc").val();
        t.escolaridade = $("#escolaridade").val();
        t.habilidade = $("#habilidade").val();
        t.profissao = $("#profissao").val();

        $.ajax({
            type: "POST",
            url: "/registro",
            data: t,
            dataType: "json",
            success: (dat) => {

                console.log(dat);

                window.location.href = '/registro';
            }
        }

        )

        return false;

    },

    tamplate: (data) => {

        var registro = $("<div></div>").attr("id", "Registro ID: " + data.id).attr("class", "registro").attr("style", "margin-bottom: 50px;");

        var nome = $("<p></p>").html("Nome: " + data.nome);
        var dat_Nasc = $("<p></p>").html("Data de Nascimento: " + data.dat_Nasc);
        var cpf = $("<p></p>").html("CPF: " + data.cpf);
        var tel = $("<p></p>").html("Telefone: " + data.tel);
        var escolaridade = $("<p></p>").html("Escolaridade: " + data.escolaridade);
        var profissao = $("<p></p>").html("Profissão: " + data.profissao);
        var habilidade = $("<p></p>").html("Habilidades: " + data.habilidade)
        var btnExcluir = $("<button></button>").attr("class", "btn btn-primary").html("Excluir");


        $(btnExcluir).on("click", (event) => {
            Registros.remove(event.target);
        });

        registro.append(nome);
        registro.append(dat_Nasc);
        registro.append(cpf);
        registro.append(tel);
        registro.append(profissao);
        registro.append(escolaridade);
        registro.append(habilidade);
        registro.append(btnExcluir);

        $("#registros").append(registro);

    },

    tamplaterr: ()=>{

        $("#registros").html("<br><h4>Dado não encontrado!</h4>");
    },

    consulta: () => {

        var t = {};

        t.nome = $("#nome").val();
        t.cpf = $("#cpf").val();
        t.dat_Nasc = $("#dat_Nasc").val();

        console.log(t.nome);
        
        $.ajax({
            type: "POST",
            url: "/consulta",
            data: t,
            success: (registro) => {
                

                Registros.tamplate(registro);
                
            },

            error: (err) => {

                console.log("Ocorreu um erro !" + err);
                Registros.tamplaterr();

            },
            dataType: "json"

        })
    },

    remove : (button) => {
        
        var registro = $(button).parent();
        var id = $(registro).attr("id").replace("Registro ID: ", "");

        $.ajax({
            type: "DELETE",
            url: "/consulta",
            data: {"id": id },
            success: (data) => {
                $(registro).remove();

            },
            error: () => {

            }
        })
    }
}

$(() => {
    $('#tel').mask('(00) 0 0000-0000');
    $('#cpf').mask('000.000.000-00', { reverse: true });

})
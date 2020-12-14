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

                $.toast({
                    text: "Dado salvo com sucesso", 
                    heading: 'Sucesso!', 
                    icon: 'success', 
                    showHideTransition: 'fade', 
                    allowToastClose: true, 
                    hideAfter: 3000, 
                    stack: 5, 
                    position: 'bottom-left', 
                    
                    
                    
                    textAlign: 'left',  
                    loader: true,  
                    loaderBg: '#9EC600',  
                    beforeShow: function () {}, 
                    afterShown: function () {}, 
                    beforeHide: function () {}, 
                    afterHidden: function () {}  
                });

                setTimeout(() => {
                    window.location.href = '/registro';
                }, 5000);
                
            },

            error: (err) =>{
                console.log(err);

                $.toast({
                    text: "Dado não foi salvo na base de dados", // Text that is to be shown in the toast
                    heading: 'Erro!', // Optional heading to be shown on the toast
                    icon: 'error', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'bottom-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    
                    
                    
                    textAlign: 'left',  // Text alignment i.e. left, right or center
                    loader: true,  // Whether to show loader or not. True by default
                    loaderBg: '#9EC600',  // Background color of the toast loader
                    beforeShow: function () {}, // will be triggered before the toast is shown
                    afterShown: function () {}, // will be triggered after the toat has been shown
                    beforeHide: function () {}, // will be triggered before the toast gets hidden
                    afterHidden: function () {}  // will be triggered after the toast has been hidden
                });
                
            }
        }

        )

        return false;

    },

    tamplate: (data) => {

        var registro = $("<div></div>").attr("id", "Registro ID:" + data.id).attr("class", "registro").attr("style", "margin-bottom: 50px;");

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
        setTimeout(() => {
            $("#registros").html("<br><br>");
        }, 2000);
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
        var id = $(registro).attr("id").replace("Registro ID:", "");

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
    },

    tamplatedita: (data) =>{

        $("#nome").attr("value", data.nome);
        $("#tel").attr("value", data.tel);
        $("#dat_Nasc").attr("value", data.dat_Nasc);
        $("#profissao").html(data.profissao);
        $("#escolaridade").html(data.escolaridade);
        $("#habilidade").html(data.habilidade);

    },

    initedita : () => {

        var cpf = $("#cpf").val();
        console.log(cpf);

        $.ajax({
            type: "POST",
            url: "/edita",
            data: { "cpf": cpf},
            success: (up) => {
                console.log(up)
                Registros.tamplatedita(up);
            },
            error: (err) => {
                $.toast({
                    text: "Dado não encontrado", // Text that is to be shown in the toast
                    heading: 'Erro!', // Optional heading to be shown on the toast
                    icon: 'error', // Type of toast icon
                    showHideTransition: 'fade', // fade, slide or plain
                    allowToastClose: true, // Boolean value true or false
                    hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                    position: 'bottom-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                    
                    
                    
                    textAlign: 'left',  // Text alignment i.e. left, right or center
                    loader: true,  // Whether to show loader or not. True by default
                    loaderBg: '#9EC600',  // Background color of the toast loader
                    beforeShow: function () {}, // will be triggered before the toast is shown
                    afterShown: function () {}, // will be triggered after the toat has been shown
                    beforeHide: function () {}, // will be triggered before the toast gets hidden
                    afterHidden: function () {}  // will be triggered after the toast has been hidden
                });
                console.log(err);
            },
            dataType: "json"
        })

    },

    edita : () => {
        
        var t = {};

        t.nome = $("#nome").val();
        t.cpf = $("#cpf").val();
        t.tel = $("#tel").val();
        t.dat_Nasc = $("#dat_Nasc").val();
        t.escolaridade = $("#escolaridade").val();
        t.habilidade = $("#habilidade").val();
        t.profissao = $("#profissao").val();

       

        $.ajax({
            type: "PUT",
            url: "/edita",
            data: t ,
            success: (data) => {

                $.toast({
                    text: "Dado salvo com sucesso", 
                    heading: 'Sucesso!', 
                    icon: 'success', 
                    showHideTransition: 'fade', 
                    allowToastClose: true, 
                    hideAfter: 3000, 
                    stack: 5, 
                    position: 'bottom-left', 
                    
                    
                    
                    textAlign: 'left',  
                    loader: true,  
                    loaderBg: '#9EC600',  
                    beforeShow: function () {}, 
                    afterShown: function () {}, 
                    beforeHide: function () {}, 
                    afterHidden: function () {}  
                });
                console.log("Dado atualizado com sucesso " + data);
                
                setTimeout(() => {
                    window.location.href = '/edita';
                }, 5000);
                

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
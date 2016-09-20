app.controller('ProjetosCtrl', function ($scope, $stateParams, ionicMaterialInk) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();
    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    var btnIncluir = document.getElementById('btn-incluir');
    btnIncluir.addEventListener('click', function () {
        location.href = '/#/app/projetos/add';
    });
    $scope.projetos = [
        {
            id: 1,
            nome: "Raiox Gestão",
            descricao: "Este projeto tem por finalidade desenvolver uma ferramenta para auxiliar o gerenciamento de Telecom para permitir obter uma redução significativa de tarifas e planos contratados",
            empresa: "",
            responsavel: "",
            data_criacao: "",
            compartilhado: false,
            dt_finalizado: ""
        },
        {
            id: 2,
            nome: "Elitte Imobiliaria",
            descricao: "Este projeto tem por finalidade desenvolver uma ferramenta para auxiliar o gerenciamento de Telecom para permitir obter uma redução significativa de tarifas e planos contratados",
            empresa: "",
            responsavel: "",
            data_criacao: "",
            compartilhado: false,
            dt_finalizado: ""
        },
        {
            id: 3,
            nome: "Subway",
            descricao: "Este projeto tem por finalidade desenvolver uma ferramenta para auxiliar o gerenciamento de Telecom para permitir obter uma redução significativa de tarifas e planos contratados",
            empresa: "",
            responsavel: "",
            data_criacao: "",
            compartilhado: false,
            dt_finalizado: ""
        }
    ];

});

app.controller('ProjetoCtrl', function($scope, $stateParams) {

    /*btnIncluir.addEventListener('click', function () {
        location.href = '/#/app/projetos/add';
    });*/
});

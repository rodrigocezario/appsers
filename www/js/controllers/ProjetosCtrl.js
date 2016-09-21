app.controller('ProjetosCtrl', function ($scope, ionicMaterialInk, projetosAPILocal) {
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

    //insert basico inicial para teste
    /*projetosAPILocal.set({
        nome: "Raiox Gestão",
        descricao: "Este projeto tem por finalidade desenvolver uma ferramenta para auxiliar o gerenciamento de Telecom para permitir obter uma redução significativa de tarifas e planos contratados",
        empresa: "",
        responsavel: "",
        compartilhado: 0,
        dt_criacao: "",
        dt_finalizado: ""
    });
    projetosAPILocal.set({
        nome: "Elitte Imobiliaria",
        descricao: "Este projeto tem por finalidade desenvolver uma ferramenta para auxiliar o gerenciamento de Telecom para permitir obter uma redução significativa de tarifas e planos contratados",
        empresa: "",
        responsavel: "",
        compartilhado: 0,
        dt_criacao: "",
        dt_finalizado: ""
    });
    projetosAPILocal.set({
        nome: "Subway",
        descricao: "Este projeto tem por finalidade desenvolver uma ferramenta para auxiliar o gerenciamento de Telecom para permitir obter uma redução significativa de tarifas e planos contratados",
        empresa: "",
        responsavel: "",
        compartilhado: 0,
        dt_criacao: "",
        dt_finalizado: ""
    });*/
    //$scope.projetos = projetosAPILocal.getById(1);
    $scope.projetos = projetosAPILocal.get();
});

app.controller('ProjetoCtrl', function($scope, $stateParams, projetosAPILocal) {
    
    if(Number($stateParams.projetoId)){
        var projeto = projetosAPILocal.getById($stateParams.projetoId);
        $scope.projeto = projeto;
    }
});

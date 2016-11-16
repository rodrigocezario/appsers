app.controller('ProjetoCtrl', function ($scope, $state, $stateParams, $ionicHistory, projetoAPILocal) {

    setInitProjeto();

    //métodos para manter projeto
    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            angular.merge($scope.projeto, res);
        });
        
    }

    $scope.salvarProjeto = function (projeto) {
        if (Number($stateParams.projetoId)) {
            projetoAPILocal.edit(projeto).then(function () {
                $state.go("app.projeto-menu", {'projetoId': $stateParams.projetoId});
            });
        } else {
            projeto.dt_criacao = new Date();
            projetoAPILocal.insert(projeto).then(function () {
                projetoAPILocal.getLastInsertId().then(function (res) {
                    projetoAPILocal.insertParticipante(res.id, usuarioLogin.id).then();
                    $state.go("app.projetos").then(function () {
                        setInitProjeto();
                        $state.go("app.projeto-menu", {'projetoId': res.id});
                    });
                });
            });
        }
    };

    $scope.menus = [
        {descricao: "Dados Cadastrais", href: "cadastro", icone: "ion-ios-paper"},
        {descricao: "Interessados", href: "interessados", icone: "ion-person-stalker"},
        {descricao: "Seções do Documento ERS", href: "secoes", icone: "ion-android-document"},
        {descricao: "Requisitos de Usuário", href: "requsuario", icone: "ion-ios-body"},
        {descricao: "Requisitos de Sistema", href: "reqsistema", icone: "ion-ios-monitor"},
        {descricao: "Rastreabilidade", href: "rastreabilidade", icone: "ion-grid"},
        {descricao: "Participantes", href: "participantes", icone: "ion-ios-people"}
    ];

    //metodos para inicializar formularios
    function setInitProjeto() {
        $scope.projeto = {nome: null, descricao: null, empresa: null, responsavel: null, compartilhado: 1, dt_criacao: null, dt_finalizado: null};
    }

});
app.controller('ProjetoCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetosAPILocal) {

	//métodos para manter projeto
    if(Number($stateParams.projetoId)){
        Promise.resolve( projetosAPILocal.getById($stateParams.projetoId) ).then(
            function(res) {
                $scope.projeto = res;
            }
        );
    }

    $scope.salvarProjeto = function (projeto) {
        if(Number($stateParams.projetoId)){
            projetosAPILocal.edit(projeto);
        }else{
            projeto.dt_criacao = new Date();
            projetosAPILocal.insert(projeto);
        }
    };

    $scope.menus = [
        {descricao:"Dados Cadastrais", href: "cadastro", icone:"ion-ios-paper"},
        {descricao:"Interessados", href: "interessados", icone:"ion-person-stalker"},
        {descricao:"Seções do Documento ERS", href: "secoes", icone:"ion-android-document"},
        {descricao:"Requisitos de Usuário", href: "requsuario", icone:"ion-ios-body"},
        {descricao:"Requisitos de Sistema", href: "reqsistema", icone:"ion-ios-monitor"},
        {descricao:"Rastreabilidade", href: "rastreabilidade", icone:"ion-grid"},
        {descricao:"Participantes", href: "participantes", icone:"ion-ios-people"}

    ];

});
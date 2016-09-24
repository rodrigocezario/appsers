app.controller('ProjetoCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetosAPILocal, projetoSecoesAPILocal) {
    
    setInitProjeto();
    setInitSecoes();

	//métodos para manter projeto
    if(Number($stateParams.projetoId)){
        
        Promise.resolve( projetosAPILocal.getById($stateParams.projetoId) ).then(
            function(res) {
                angular.merge($scope.projeto, res);
            }
        );
        
        Promise.resolve( projetoSecoesAPILocal.getByIdProjeto($stateParams.projetoId) ).then(
            function(res) {
                angular.merge($scope.secoes, res);
            }
        );

        $scope.salvarSecoes = function (secoes) {
            secoes.id_projeto = $stateParams.projetoId;
            if(Number(secoes.id_)){
                projetoSecoesAPILocal.edit(secoes);
            }else{
                projetoSecoesAPILocal.insert(secoes);
            }
        };
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

    //metodos para inicializar formularios
    function setInitProjeto(){
        $scope.projeto = { nome:null, descricao:null, empresa:null, responsavel:null, compartilhado:0, dt_criacao:null, dt_finalizado:null };
    };

    function setInitSecoes(){
        $scope.secoes = { id_projeto:null, proposito:null, escopo:null, def_acron_abrev:null, referencias:null, organizacao:null, perspectiva:null, funcionalidades:null, caracteristicas_utilizador:null, restricoes:null, assuncoes_dependencias:null};
    };
    
});
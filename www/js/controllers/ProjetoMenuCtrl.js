app.controller('ProjetoMenuCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal) {
    //atualiza exibição da lista ao voltar do cadastro
    $scope.$on('$ionicView.enter', function() {
       $scope.projetos = projetoAPILocal.get();
       $scope.blinds();
    });

    if(Number($stateParams.projetoId)){
        
        Promise.resolve( projetoAPILocal.getById($stateParams.projetoId) ).then(
            function(res) {
                $scope.projeto = res;
            }
        );
    }

    $scope.menus = [
        {descricao:"Dados Cadastrais", href: "cadastro", icone:"ion-ios-paper"},
        {descricao:"Interessados", href: "interessados", icone:"ion-person-stalker"},
        {descricao:"Seções do Documento ERS", href: "secoes", icone:"ion-android-document"},
        {descricao:"Requisitos de Usuário", href: "requsuario", icone:"ion-ios-body"},
        {descricao:"Requisitos de Sistema", href: "reqsistema", icone:"ion-ios-monitor"},
        {descricao:"Rastreabilidade", href: "rastreabilidade", icone:"ion-grid"},
        {descricao:"Participantes", href: "participantes", icone:"ion-ios-people"}
    ];

    //metodos para efeito visual
    var resetEffect = function() {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };

    $scope.blinds = function() {
        resetEffect();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds();
        }, 100);
    };
    
});
app.controller('ParticipanteListCtrl', function ($scope, $state, $stateParams, projetoAPILocal, participantesAPILocal, utilAPI, ionicMaterialMotion) {
    $scope.$on('$ionicView.enter', function () {
        if (Number($stateParams.projetoId)) {
            projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
                $scope.projeto = res;
            });
        }
        atualizaLista();
    });

    function atualizaLista() {
        participantesAPILocal.getByIdProjeto($stateParams.projetoId).then(function (res) {
            $scope.participantes = res;
            $scope.blinds();
        });
    }

    $scope.excluir = function (item) {
        if (item.id != app.usuarioLogin.id && $scope.projeto.id_usuario != item.id) {
            utilAPI.confirmarExclusao().then(function (res) {
                if (res) {
                    participantesAPILocal.deleteByIdUsuario(item.id).then(function () {
                        //utilAPI.avisoTemp("Registro excluído com sucesso");
                        atualizaLista();
                    });
                }
            });
        }else{
            utilAPI.avisoTemp("Para sair deste projeto é necessário excluir todo o projeto através do menu principal", null, 3000);
        }
    };
    
    $scope.incluir = function () {
        utilAPI.avisoTemp("Em breve disponível");
        //$state.go("app.projeto-participantes-add",{'projetoId': $stateParams.projetoId});
    };
    
    //metodos para efeito visual
    var resetEffect = function () {
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

    $scope.blinds = function () {
        resetEffect();
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };
});
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

    $scope.blinds = function () {
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };
});
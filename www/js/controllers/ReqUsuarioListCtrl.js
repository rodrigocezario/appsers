app.controller('ReqUsuarioListCtrl', function ($scope, $state, $stateParams, ionicMaterialMotion, utilAPI, projetoAPILocal, reqUsuarioAPILocal) {

    $scope.$on('$ionicView.enter', function () {
        if (Number($stateParams.projetoId)) {
            projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
                $scope.projeto = res;
            });
        }
        atualizaLista();
    });

    $scope.excluir = function (item) {
        utilAPI.confirmarExclusao().then(function (res) {
            if (res) {
                reqUsuarioAPILocal.delete(item.id).then(function () {
                    reqUsuarioAPILocal.deleteChilds();
                    //utilAPI.avisoTemp("Registro excluído com sucesso");
                    atualizaLista();
                });
            }
        });
    };

    $scope.editar = function (item) {
        $state.go("app.projeto-requsuario-cadastro", {'projetoId': item.id_projeto,'reqUsuarioId': item.id});
    };
    
    $scope.incluir = function () {
        $state.go("app.projeto-requsuario-add",{'projetoId': $stateParams.projetoId});
    };
    
    function atualizaLista() {
        reqUsuarioAPILocal.getByIdProjeto($stateParams.projetoId).then(function (res) {
            $scope.requisitos = res;
            $scope.blinds();
        });
    }

    $scope.blinds = function () {
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };


});
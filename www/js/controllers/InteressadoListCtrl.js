app.controller('InteressadoListCtrl', function ($scope, $state, $stateParams, ionicMaterialMotion, utilAPI, projetoAPILocal, interessadosAPILocal) {

    $scope.$on('$ionicView.enter', function () {
        if (Number($stateParams.projetoId)) {
            projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
                $scope.projeto = res;
            });
            atualizaLista();
        }
        
    });

    $scope.excluir = function (item) {
        utilAPI.confirmarExclusao().then(function (res) {
            if (res) {
                interessadosAPILocal.delete(item.id).then(function () {
                    interessadosAPILocal.deleteChilds();
                    //utilAPI.avisoTemp("Registro excluído com sucesso");
                    atualizaLista();
                });
            }
        });
    };

    $scope.editar = function (item) {
        $state.go("app.projeto-interessados-cadastro", {'projetoId': item.id_projeto, 'interessadoId': item.id});
    };
    
    $scope.incluir = function () {
        $state.go("app.projeto-interessados-add",{'projetoId': $stateParams.projetoId});
    };
    
    function atualizaLista() {
        interessadosAPILocal.getByIdProjeto($stateParams.projetoId).then(function (res) {
            $scope.interessados = res;
            $scope.blinds();
        });
    }

    $scope.blinds = function () {
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };
});

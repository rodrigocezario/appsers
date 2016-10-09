app.controller('InteressadoCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, interessadosAPILocal) {

    setInitInteressado();

    if (Number($stateParams.interessadoId)) {
        Promise.resolve(interessadosAPILocal.getById($stateParams.interessadoId)).then(
                function (res) {
                    angular.merge($scope.interessado, res);
                }
        );
    }

    if (Number($stateParams.projetoId)) {
        Promise.resolve(projetoAPILocal.getById($stateParams.projetoId)).then(
                function (res) {
                    $scope.projeto = res;
                }
        )
    }

    $scope.salvarInteressado = function (interessado) {
        interessado.id_projeto = $stateParams.projetoId;
        if (Number($stateParams.interessadoId)) {
            interessadosAPILocal.edit(interessado);
        } else {
            interessadosAPILocal.insert(interessado);
        }
    };

    function setInitInteressado() {
        $scope.interessado = {id_projeto: null, nome: null, papel: null, funcao: null, email: null, telefone: null};
    }
    ;

});
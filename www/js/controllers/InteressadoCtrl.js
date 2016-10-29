app.controller('InteressadoCtrl', function ($scope, $state, $stateParams, projetoAPILocal, interessadosAPILocal) {

    setInitInteressado();

    if (Number($stateParams.interessadoId)) {
        interessadosAPILocal.getById($stateParams.interessadoId).then(function (res) {
            angular.merge($scope.interessado, res);
        });
    }

    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
    }

    $scope.salvarInteressado = function (interessado) {
        interessado.id_projeto = $stateParams.projetoId;
        if (Number($stateParams.interessadoId)) {
            interessadosAPILocal.edit(interessado).then(function(){
                $state.go("app.projeto-interessados",{'projetoId': $stateParams.projetoId});
            });
        } else {
            interessadosAPILocal.insert(interessado).then(function(){
                $state.go("app.projeto-interessados",{'projetoId': $stateParams.projetoId});
            });
        }
    };

    function setInitInteressado() {
        $scope.interessado = {id_projeto: null, nome: null, papel: null, funcao: null, email: null, telefone: null};
    }

});
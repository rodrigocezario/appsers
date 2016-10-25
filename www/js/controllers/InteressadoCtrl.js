app.controller('InteressadoCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, interessadosAPILocal) {

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
                alert("Registro salvo com sucesso");
            });
        } else {
            interessadosAPILocal.insert(interessado).then(function(){
                alert("Registro salvo com sucesso");
            });
        }
    };

    function setInitInteressado() {
        $scope.interessado = {id_projeto: null, nome: null, papel: null, funcao: null, email: null, telefone: null};
    }
    ;

});
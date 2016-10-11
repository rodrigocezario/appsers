app.controller('ReqUsuarioCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, reqUsuarioAPILocal) {

    setInitReqUsuario();

    if (Number($stateParams.reqUsuarioId)) {
        Promise.resolve(reqUsuarioAPILocal.getById($stateParams.reqUsuarioId)).then(
                function (res) {
                    angular.merge($scope.requisito, res);
                }
        );

    }
    if (Number($stateParams.projetoId)) {
        Promise.resolve(projetoAPILocal.getById($stateParams.projetoId)).then(
                function (res) {
                    $scope.projeto = res;
                }
        );
        $scope.interessados = reqUsuarioAPILocal.getInteressados($stateParams.projetoId, $stateParams.reqUsuarioId);
    }
    
    $scope.salvarReqUsuario = function (requisito, interessados) {
        requisito.id_projeto = $stateParams.projetoId;
        requisito.interessados = interessados;
        if (Number($stateParams.reqUsuarioId)) {
            reqUsuarioAPILocal.edit(requisito);
        } else {
            reqUsuarioAPILocal.insert(requisito);
        }
    };

    function setInitReqUsuario() {
        $scope.requisito = {id: null, id_projeto: null, interessados: null, descricao: null};
    }
    ;

});
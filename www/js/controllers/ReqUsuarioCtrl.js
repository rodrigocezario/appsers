app.controller('ReqUsuarioCtrl', function ($scope, $state, $stateParams, projetoAPILocal, reqUsuarioAPILocal) {

    setInitReqUsuario();

    if (Number($stateParams.reqUsuarioId)) {
        reqUsuarioAPILocal.getById($stateParams.reqUsuarioId).then(function (res) {
            angular.merge($scope.requisito, res);
        });

    }
    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
        reqUsuarioAPILocal.getInteressados($stateParams.projetoId, $stateParams.reqUsuarioId).then(function (res) {
            $scope.interessados = res;
        });
    }

    $scope.salvarReqUsuario = function (requisito) {
        requisito.id_projeto = $stateParams.projetoId;
        requisito.id = $stateParams.reqUsuarioId;
        
        var interessadosCheck = [];
        angular.forEach($scope.interessados, function (item) {
            if(item.is_check == true){
                interessadosCheck.push(item.id);
            }
        });
        
        requisito.interessados = interessadosCheck;

        if (Number($stateParams.reqUsuarioId)) {
            reqUsuarioAPILocal.edit(requisito);
            $state.go("app.projeto-requsuario",{'projetoId': $stateParams.projetoId});
        } else {
            reqUsuarioAPILocal.insert(requisito);
            $state.go("app.projeto-requsuario",{'projetoId': $stateParams.projetoId});
        }
    };

    function setInitReqUsuario() {
        $scope.requisito = {id: null, id_projeto: null, interessados: null, descricao: null};
    }

});
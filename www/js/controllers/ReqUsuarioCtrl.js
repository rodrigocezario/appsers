app.controller('ReqUsuarioCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, reqUsuarioAPILocal) {

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
        //Ajustar rotina de interessados, não esta salvando os interessados do requisito corretamente
        var interessadosCheck = [];
        
        angular.forEach(requisito.interessados, function (valor, id) {
            if(valor == true){
                interessadosCheck.push(id);
            }
        });
        requisito.interessados = interessadosCheck;
        
        if (Number($stateParams.reqUsuarioId)) {
            reqUsuarioAPILocal.edit(requisito).then(function () {
                reqUsuarioAPILocal.inserirInteressados(requisito);
                alert("Registro salvo com sucesso");
            });
        } else {
            reqUsuarioAPILocal.insert(requisito).then(function () {
                reqUsuarioAPILocal.inserirInteressados(requisito);
                alert("Registro salvo com sucesso");
            });
        }
    };

    function setInitReqUsuario() {
        $scope.requisito = {id: null, id_projeto: null, interessados: null, descricao: null};
    }

});
app.controller('ReqUsuarioCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, reqUsuarioAPILocal, interessadosAPILocal) {

    setInitReqUsuario();

    if(Number($stateParams.reqUsuarioId)){
        Promise.resolve( reqUsuarioAPILocal.getById($stateParams.reqUsuarioId) ).then(
            function(res) {
                angular.merge($scope.requisito, res);
            }
        );

    }
    if(Number($stateParams.projetoId)){
        Promise.resolve( projetoAPILocal.getById($stateParams.projetoId) ).then(
            function(res) {
                $scope.projeto = res;
            }
        );
        $scope.interessados = interessadosAPILocal.getByIdProjeto($stateParams.projetoId);
    }

    $scope.salvarReqUsuario = function (requisito) {
        requisito.id_projeto = $stateParams.projetoId;
        if(Number($stateParams.reqUsuarioId)){
            reqUsuarioAPILocal.edit(requisito);
        }else{
            reqUsuarioAPILocal.insert(requisito);
        }
    };
    
    function setInitReqUsuario(){
        $scope.requisito = { id_projeto:null, id_interessado:null, descricao:null};
    };

});
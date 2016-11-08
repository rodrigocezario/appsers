app.controller('ReqSistemaCtrl', function ($scope, $stateParams, $state, ionicMaterialMotion, projetoAPILocal, reqSistemaAPILocal, utilAPI) {
    if (Number($stateParams.tipoId)) {
        $scope.requisito = [];
        $scope.requisito.tipo = $stateParams.tipoId;
    }
    /*Implementar rotina*/
});
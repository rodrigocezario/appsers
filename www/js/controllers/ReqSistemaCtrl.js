app.controller('ReqSistemaCtrl', function ($scope, $stateParams, $state, ionicMaterialMotion, projetoAPILocal, reqSistemaAPILocal, utilAPI) {
    
    setInitReqSistema();
    if (Number($stateParams.requisitoId)) {
        reqSistemaAPILocal.getById($stateParams.requisitoId).then(function (res) {
            angular.merge($scope.requisito, res);
        });

    }
    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
    }

    if ($scope.requisito && Number($stateParams.tipoId)) {
        $scope.requisito.tipo = Number($stateParams.tipoId);
    }
    
    $scope.salvar = function (requisito) {
        requisito.id_projeto = $stateParams.projetoId;
        requisito.id = $stateParams.requisitoId;
        console.log(requisito);
        if (Number($stateParams.requisitoId)) {
            console.log("Edit");
            reqSistemaAPILocal.edit(requisito);
        } else {
            console.log("Insert");
            reqSistemaAPILocal.insert(requisito);
        }
        utilAPI.avisoTemp("Registro salvo com sucesso.", null, 1000);
        if($scope.requisito.tipo == 1){
            $state.go("app.projeto-reqsistema-funcional",{'projetoId': $stateParams.projetoId});
        }else{
            $state.go("app.projeto-reqsistema-naofuncional",{'projetoId': $stateParams.projetoId});
        }
    };
    
    function setInitReqSistema() {
        $scope.requisito = {
            id: null, id_padrao: null, tipo: 1, resumo: null, descricao: null,
            id_requisito: null, id_req_sistema_projeto: null, id_requisito_usuario: null, reuso: null, id_projeto: null,
            id_vinculo: null, importancia: 1, urgencia: 1, observacao: null
        };
    }
    
    $scope.tipoOptions = [
        {id: 1, name: "Funcional"},
        {id: 2, name: "Não Funcional"}
    ];

    $scope.importanciaOptions = [
        {id: 1, name: "Essencial"},
        {id: 2, name: "Condicional"},
        {id: 3, name: "Opcional"}
    ];

    $scope.urgenciaOptions = [
        {id: 1, name: "Alta"},
        {id: 2, name: "Média"},
        {id: 3, name: "Baixa"}
    ];
});
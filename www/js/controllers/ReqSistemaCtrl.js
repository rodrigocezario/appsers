app.controller('ReqSistemaCtrl', function ($scope, $stateParams, $state, projetoAPILocal, reqSistemaAPILocal, padraoAPILocal, reqUsuarioAPILocal, utilAPI) {

    if (Number($stateParams.requisitoId)) {
        reqSistemaAPILocal.getById($stateParams.requisitoId).then(function (res) {
            angular.merge($scope.requisito, res);
            $scope.padrao = null;
            padraoAPILocal.getById($scope.requisito.id_padrao).then(function(res){
                if(res){
                    $scope.padrao = res;
                }
            });
            
        });
    }
    if (Number($stateParams.projetoId)) {
        setInitReqSistema();
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
    }

    if ($scope.requisito && Number($stateParams.reqTipoId)) {
        $scope.requisito.tipo = Number($stateParams.reqTipoId);
    }
    
    if (Number($stateParams.padraoId)){
        $scope.requisito.id_padrao = $stateParams.padraoId;
        $scope.padrao = null;
        padraoAPILocal.getById($stateParams.padraoId).then(function(res){
            if(res){
                $scope.padrao = res;
                if(res.tipo_categoria == 1){
                    $scope.requisito.tipo = 1;
                }else{
                    $scope.requisito.tipo = 2;
                }
            }
        });
    }

    $scope.salvar = function (requisito) {
        requisito.id_projeto = $stateParams.projetoId;
        requisito.id = $stateParams.requisitoId;
        if (Number($stateParams.requisitoId)) {
            reqSistemaAPILocal.edit(requisito).then(function () {
                goToList($scope.requisito.tipo);
            });
        } else {
            reqSistemaAPILocal.insert(requisito).then(function () {
                reqSistemaAPILocal.deleteChilds();
                utilAPI.avisoTemp("Registro salvo com sucesso.", null, 1000);
                goToList($scope.requisito.tipo);
            });
        }
    };

    function goToList($tipo) {
        if ($tipo == 1) {
            $state.go("app.projeto-reqsistema-funcional", {'projetoId': $stateParams.projetoId}).then();
        } else {
            $state.go("app.projeto-reqsistema-naofuncional", {'projetoId': $stateParams.projetoId}).then();
        }
    }

    function setInitReqSistema() {
        $scope.requisito = {
            id: null, id_padrao: null, tipo: 1, resumo: null, descricao: null,
            id_requisito: null, id_req_sistema_projeto: null, id_requisito_usuario: null, reuso: null, id_projeto: null,
            id_vinculo: null, importancia: 1, urgencia: 1, observacao: null
        };
    }

    $scope.tabSelect = function (tipo) {
        if (tipo == 2) {
            $state.go("app.projeto-reqsistema-padrao", {'projetoId': $stateParams.projetoId, 'requisitoId': $scope.requisito.id});
        } else if (tipo == 3) {
            $state.go("app.projeto-reqsistema-sugestoes", {'projetoId': $stateParams.projetoId, 'requisitoId': $scope.requisito.id});
        }
    };
    
    $scope.padraoDetalhe = function(){
        var reqId = null
        if (Number($stateParams.requisitoId)) {
            reqId = $stateParams.requisitoId;
        }
        if($scope.padrao && $scope.padrao.id && Number($scope.padrao.id)){
            $state.go("app.projeto-reqsistema-padrao-detalhe", {'projetoId': $stateParams.projetoId, 'requisitoId': reqId, 'padraoId': $scope.padrao.id, 'modo': 'leitura'});
        }
    }

    reqUsuarioAPILocal.getByIdProjeto($stateParams.projetoId).then(function (res) {
        $scope.reqUsuarioOptions = [{id: null, name: "Não definido", id_requisito: null}];
        angular.forEach(res, function (item) {
            if (!item.id || item.id != "") {
                $scope.reqUsuarioOptions.push({id: item.id, name: "RU" + ('000' + item.id_requisito).substr(-3, 3) + " - " + item.descricao.substr(0, 100), id_requisito: "RU" + ('000' + item.id_requisito).substr(-3, 3)});
            }
        });
    });

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
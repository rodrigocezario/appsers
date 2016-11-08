app.controller('ReqSistemaFuncionalListCtrl', function ($scope, $stateParams, $state, $ionicTabsDelegate, ionicMaterialMotion, projetoAPILocal, reqSistemaAPILocal, utilAPI) {

    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
        $scope.$on('$ionicView.enter', function () {
            atualizaLista();
        });
    }
    
    $scope.excluir = function (item) {
        utilAPI.confirmarExclusao().then(function (res) {
            if (res) {
                reqSistemaAPILocal.deleteReqSisProjeto(item.id_req_sistema_projeto).then(function () {
                    if (item.reuso = 0) {
                        reqSistemaAPILocal.delete(item.id).then();
                    }
                    reqSistemaAPILocal.deleteFathers();
                    reqSistemaAPILocal.deleteChilds();
                });
                atualizaLista();
                utilAPI.avisoTemp("Registro excluído com sucesso");
            }
        });
    };

    $scope.editar = function (item) {
        $state.go("app.projeto-reqsistema-cadastro", {'projetoId': item.id_projeto, 'requisitoId': item.id});
    };

    $scope.incluir = function () {
        $state.go("app.projeto-reqsistema-add", {'projetoId': $stateParams.projetoId, 'tipoId': 1});
    };

    $scope.descImportancia = function (id) {
        if (id == 1) {
            return "Essencial";
        } else if (id == 2) {
            return "Condicional";
        } else if (id == 3) {
            return "Opcional";
        } else {
            return null;
        }
    }

    $scope.descUrgencia = function (id) {
        if (id == 1) {
            return "Alta";
        } else if (id == 2) {
            return "Média";
        } else if (id == 3) {
            return "Baixa";
        } else {
            return null;
        }
    }

    function atualizaLista() {
        reqSistemaAPILocal.getByIdProjeto($stateParams.projetoId, 1).then(function (res) {
            $scope.requisitos = res;
        });
        $scope.blinds();
    }

    $scope.blinds = function () {
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };
});
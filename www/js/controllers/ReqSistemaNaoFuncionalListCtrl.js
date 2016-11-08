app.controller('ReqSistemaNaoFuncionalListCtrl', function ($scope, $stateParams, $state, ionicMaterialMotion, projetoAPILocal, reqSistemaAPILocal, utilAPI) {

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
        $state.go("app.projeto-reqsistema-add", {'projetoId': $stateParams.projetoId, 'tipoId': 2});
    };
    
    $scope.tabSelect = function () {
        $state.go("app.projeto-reqsistema-funcional", {'projetoId': $stateParams.projetoId});
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
        reqSistemaAPILocal.getByIdProjeto($stateParams.projetoId, 2).then(function (res) {
            $scope.requisitos = res;
        });
        $scope.blinds();
    }
    
    var resetEffect = function () {
        var inClass = document.querySelectorAll('.in');
        for (var i = 0; i < inClass.length; i++) {
            inClass[i].classList.remove('in');
            inClass[i].removeAttribute('style');
        }
        var done = document.querySelectorAll('.done');
        for (var i = 0; i < done.length; i++) {
            done[i].classList.remove('done');
            done[i].removeAttribute('style');
        }
        var ionList = document.getElementsByTagName('ion-list');
        for (var i = 0; i < ionList.length; i++) {
            var toRemove = ionList[i].className;
            if (/animate-/.test(toRemove)) {
                ionList[i].className = ionList[i].className.replace(/(?:^|\s)animate-\S*(?:$|\s)/, '');
            }
        }
    };
    
    $scope.blinds = function () {
        resetEffect();
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };
});
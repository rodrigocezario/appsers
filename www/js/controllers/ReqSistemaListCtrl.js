app.controller('ReqSistemaListCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, reqSistemaAPILocal, utilAPI) {

    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
        //atualiza exibição da lista ao voltar do cadastro
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
                atualizaLista(item.tipo);
                utilAPI.avisoTemp("Registro excluído com sucesso");
            }
        });
    };

    $scope.editar = function (item) {
        utilAPI.avisoTemp("Em breve disponível!");
        //$state.go("app.projeto-requsuario-cadastro", {'projetoId': item.id_projeto,'reqUsuarioId': item.id});
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
    function atualizaLista(tipoRequisito = null) {
        if (!tipoRequisito || tipoRequisito == 1) {
            reqSistemaAPILocal.getByIdProjeto($stateParams.projetoId, 1).then(function (res) {
                $scope.funcionais = res;
            });
        }
        if (!tipoRequisito || tipoRequisito == 2) {
            reqSistemaAPILocal.getByIdProjeto($stateParams.projetoId, 2).then(function (res) {
                $scope.naofuncionais = res;
            });
        }
        $scope.blinds;
    }

    //metodos para efeito visual
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
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    };
});
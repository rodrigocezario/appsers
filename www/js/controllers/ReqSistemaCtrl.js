app.controller('ReqSistemaCtrl', function ($scope, $stateParams, $state, $ionicHistory, projetoAPILocal, reqSistemaAPILocal, padraoAPILocal, reqUsuarioAPILocal, utilAPI) {
    if (Number($stateParams.requisitoId)) {
        setInitReqSistema();
        reqSistemaAPILocal.getById($stateParams.requisitoId).then(function (res) {
            angular.merge($scope.requisito, res);
            $scope.padrao = null;
            padraoAPILocal.getById($scope.requisito.id_padrao).then(function (res) {
                if (res) {
                    $scope.padrao = res;
                    padraoAPILocal.getExemploByIdPadrao(res.id).then(function (res2) {
                        $scope.padrao.exemplos = res2;
                    });
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
    if (Number($stateParams.padraoId)) {
        $scope.requisito.id_padrao = $stateParams.padraoId;
        $scope.padrao = {};
        $scope.padrao.exemplos = {};

        padraoAPILocal.getById($stateParams.padraoId).then(function (res) {
            if (res) {
                $scope.padrao = res;
                if (res.tipo_categoria == 1) {
                    $scope.requisito.tipo = 1;
                } else {
                    $scope.requisito.tipo = 2;
                }
                padraoAPILocal.getExemploByIdPadrao($stateParams.padraoId).then(function (res2) {
                    $scope.padrao.exemplos = res2;
                });
            }
        });
        $scope.sugestoes = {};
        reqSistemaAPILocal.getSugestao($scope.requisito.id_padrao, $scope.requisito.id).then(function (res2) {
            $scope.sugestoes = res2;
        });
    }

    if (Number($stateParams.templateId)) {
        padraoAPILocal.getTemplateById($stateParams.templateId).then(function (res) {
            if (res) {
                if ($scope.requisito) {
                    $scope.requisito.resumo = String(res.resumo);
                    $scope.requisito.descricao = String(res.definicao);
                }
            }
        });
    }

    if (Number($stateParams.reqReusoId)) {
        reqSistemaAPILocal.getById($stateParams.reqReusoId).then(function (res) {
            if (res) {
                if ($scope.requisito) {
                    $scope.requisito.resumo = String(res.resumo);
                    $scope.requisito.descricao = String(res.descricao);
                    $scope.requisito.importancia = parseInt(res.importancia);
                    $scope.requisito.urgencia = parseInt(res.urgencia);
                    $scope.requisito.reuso = 1;
                    if ($stateParams.reqReusoTipoVinculo == 2) {
                        $scope.requisito.id_vinculo = parseInt($stateParams.reqReusoId);
                    }
                }
            }
        });
    }

    $scope.salvar = function (requisito) {
        requisito.id_projeto = $stateParams.projetoId;
        requisito.id = $stateParams.requisitoId;
        if (Number($stateParams.requisitoId)) {
            reqSistemaAPILocal.edit(requisito).then(function () {
                $scope.goToList($scope.requisito.tipo);
            });
        } else {
            reqSistemaAPILocal.insert(requisito).then(function () {
                reqSistemaAPILocal.deleteChilds();
                utilAPI.avisoTemp("Registro salvo com sucesso.", null, 1000);
                $scope.goToList($scope.requisito.tipo);
            });
        }
    };

    $scope.goToList = function ($tipo) {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go("app.projeto-menu", {'projetoId': $stateParams.projetoId}).then(function () {
            $ionicHistory.nextViewOptions({
                disableBack: false
            });
            if ($tipo == 1) {
                $state.go("app.projeto-reqsistema-funcional", {'projetoId': $stateParams.projetoId}).then();
            } else {
                $state.go("app.projeto-reqsistema-naofuncional", {'projetoId': $stateParams.projetoId}).then();
            }
        });
    }

    function setInitReqSistema() {
        $scope.requisito = {
            id: null, id_padrao: null, tipo: 1, resumo: null, descricao: null,
            id_requisito: null, id_req_sistema_projeto: null, id_requisito_usuario: null, reuso: null, id_projeto: null,
            id_vinculo: null, importancia: 1, urgencia: 1, observacao: null
        };
        $scope.sugestoes = {};
    }

    $scope.tabSelect = function (tipo) {
        if (tipo == 1) {
            if ($scope.requisito.id != null) {
                $state.go("app.projeto-reqsistema-cadastro", {'projetoId': $stateParams.projetoId, 'requisitoId': $scope.requisito.id});
            } else if ($stateParams.padraoId != null) {
                $state.go(
                        "app.projeto-reqsistema-addpadrao",
                        {'projetoId': $stateParams.projetoId, 'padraoId': $stateParams.padraoId},
                        {location: true, inherit: true, inherit: true, relative: $state.$current}
                );
            }
        } else if (tipo == 3) {
            $state.go(
                    "app.projeto-reqsistema-sugestoes",
                    {'projetoId': $stateParams.projetoId, 'requisitoId': $scope.requisito.id, 'padraoId': $scope.requisito.id_padrao},
                    {location: true, inherit: true, relative: $state.$current}
            );
        }
    };

    $scope.padraoDetalhe = function () {
        var reqId = null
        if (Number($stateParams.requisitoId)) {
            reqId = $stateParams.requisitoId;
        }
        if ($scope.padrao && $scope.padrao.id && Number($scope.padrao.id)) {
            $state.go("app.projeto-reqsistema-padrao-detalhe", {'projetoId': $stateParams.projetoId, 'requisitoId': reqId, 'padraoId': $scope.padrao.id, 'modo': 'leitura'});
        }
    }

    utilAPI.modal('exemplos-modal.html', $scope);
    $scope.selecionarExemplo = function (idExemplo) {
        if (!$scope.requisito.id_vinculo) {
            utilAPI.confirmar("Utilizar este exemplo para especificação?", "ATENÇÃO: resumo e descrição do requisito (não salvos) serão substituídos").then(function (res) {
                if (res) {
                    padraoAPILocal.getExemploById(idExemplo).then(function (res2) {
                        if (res2) {
                            if ($scope.requisito) {
                                $scope.requisito.resumo = angular.element("<span>" + res2.resumo + "</span>").text();
                                $scope.requisito.descricao = angular.element("<p>" + res2.definicao + "</p>").text();
                                $scope.requisito.reuso = null;
                                $scope.closeModal();
                            }
                        }
                    });
                }
            });
        }
    }

    $scope.selecionarSugestao = function (itemReq, tipoVinculo) {
        var msgTitulo = '';
        var msgDescricao = '';
        if (tipoVinculo == 1) {
            msgTitulo = "Utilizar dados do requisito?";
            msgDescricao = "ATENÇÃO: resumo e descrição do requisito (não salvos) serão substituídos";
        } else if (tipoVinculo == 2) {
            msgTitulo = "Utilizar dados do requisito e manter ligação?";
            msgDescricao = "ATENÇÃO: resumo e descrição do requisito (não salvos) serão substituídos. Além disso, sempre que o autor original do requisito fizer modificações nos campos principais o seu requisito também será modificado automaticamente.";
        }
        utilAPI.confirmar(msgTitulo, msgDescricao).then(function (res) {
            if (res) {
                $state.go("app.projeto-reqsistema-addpadrao", {'projetoId': $stateParams.projetoId, 'padraoId': $stateParams.padraoId, 'reqReusoId': itemReq.id, 'reqReusoTipoVinculo': tipoVinculo});
            }
        });
    }

    $scope.removerVinculo = function () {
        utilAPI.confirmar("Deseja remover vínculo com o autor?", "Ao confirmar você poderá editar o requisito porém não receberá mais alterações que eventualmente serão feitas pelo autor.").then(function (res) {
            if (res) {
                $scope.requisito.id_vinculo = null;
            }
        });
    }

    reqUsuarioAPILocal.getByIdProjeto($stateParams.projetoId).then(function (res) {
        $scope.reqUsuarioOptions = [{id: null, name: "Não definido", id_requisito: null}];
        angular.forEach(res, function (item) {
            if (!item.id || item.id != "") {
                $scope.reqUsuarioOptions.push({id: item.id, name: "RU" + ('000' + item.id_requisito).substr(-3, 3) + " - " + item.descricao.substr(0, 100), id_requisito: "RU" + ('000' + item.id_requisito).substr(-3, 3)});
            }
        });
    });

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
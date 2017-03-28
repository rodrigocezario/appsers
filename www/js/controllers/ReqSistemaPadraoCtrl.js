app.controller('ReqSistemaPadraoCtrl', function ($scope, $state, $stateParams, utilAPI, projetoAPILocal, padraoAPILocal) {

    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
        setInitFiltro();
        padraoAPILocal.get().then(function (res) {
            $scope.padroes = res;
        });
    }

    if (Number($stateParams.padraoId)) {
        padraoAPILocal.getById($stateParams.padraoId).then(function (res) {
            $scope.padrao = res;
            if ($scope.padrao) {
                padraoAPILocal.getTemplateByIdPadrao($stateParams.padraoId).then(function (temp) {
                    $scope.padrao.templates = temp;
                });
            }
        });
        $scope.modo = $stateParams.modo;
    }


    padraoAPILocal.getCategoria().then(function (res) {
        $scope.categoriaOptions = [{id: null, name: "Não definido"}];
        angular.forEach(res, function (item) {
            if (!item.id || item.id != "") {
                $scope.categoriaOptions.push({id: item.id, name: item.descricao.substr(0, 100)});
            }
        });
    });

    $scope.tipoCategoriaOptions = [
        {id: null, name: "Não definido"},
        {id: 1, name: "Funcional"},
        {id: 0, name: "Não Funcional"}
    ];

    $scope.padraoDetalhe = function (item) {
        $state.go("app.projeto-reqsistema-padrao-detalhe", {'projetoId': $stateParams.projetoId, 'padraoId': item.id, 'modo': 'selecionar'});
    };
    $scope.selecionarPadrao = function (padraoId) {
        if (Number(padraoId) && !Number($stateParams.padraoId)) {
            $stateParams.padraoId = padraoId;
        }
        utilAPI.avisoTemp("Padrão Selecionado", "Padrão selecionado para o requisito", 1500);
        $state.go("app.projeto-reqsistema-padrao-template", {'projetoId': $stateParams.projetoId, 'padraoId': $stateParams.padraoId});
    }

    $scope.selecionarTemplate = function (templateId = null) {
        if (Number($stateParams.padraoId)) {
            $state.go("app.projeto-reqsistema-addpadrao", {'projetoId': $stateParams.projetoId, 'padraoId': $stateParams.padraoId, 'templateId': templateId});
    }
    }

    function setInitFiltro() {
        $scope.filtro = {termo: null, id_categoria: null, tipo_categoria: null};
    }

}).filter('filtroPadrao', function () {
    return function (items, filtro) {
        var retorno = [];
        if (filtro && filtro.termo) {
            var termo = filtro.termo;
            termo.replace(/\\/g, "\\\\");
            if ((termo.match(/\*/g) || []).length == 2) {
                termo = new RegExp(termo.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, '.+'));
            }
        }
        var reTermo = new RegExp(termo, 'i');
        angular.forEach(items, function (item) {
            var compare = item.nome + item.objetivo;
            if (compare.match(reTermo) && (!filtro.id_categoria || (item.id_categoria == filtro.id_categoria)) && (filtro.tipo_categoria == null || (item.tipo_categoria == filtro.tipo_categoria))) {
                retorno.push(item);
            }
        });
        return retorno;
    };
}).filter('stripTags', function () {
    return function (text) {
        return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});
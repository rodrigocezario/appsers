app.controller('RelatorioCtrl', function ($scope, $stateParams, projetoAPILocal, secoesAPILocal, interessadosAPILocal, reqUsuarioAPILocal, reqSistemaAPILocal, participantesAPILocal) {
    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
        
        interessadosAPILocal.getByIdProjeto($stateParams.projetoId).then(function(res){
            $scope.interessados = res;
        });
        
        secoesAPILocal.getByIdProjeto($stateParams.projetoId).then(function(res){
            $scope.secoes = res;
        });
        
        reqUsuarioAPILocal.getByIdProjeto($stateParams.projetoId).then(function(res){
            $scope.requsuario = res;
        });
        
        reqSistemaAPILocal.getByIdProjeto($stateParams.projetoId, 1).then(function(res){
            $scope.reqfuncionais = [];
            angular.forEach(res, function(objVal, key){
                if(objVal.id_requisito_usuario){
                    reqUsuarioAPILocal.getById($stateParams.projetoId).then(function(reqUsu){
                        objVal.requsuario = reqUsu;
                    });
                }
                $scope.reqfuncionais.push(objVal)
            });
        });
        
        reqSistemaAPILocal.getByIdProjeto($stateParams.projetoId, 2).then(function(res){
            $scope.reqnaofuncionais = [];
            angular.forEach(res, function(objVal, key){
                if(objVal.id_requisito_usuario){
                    reqUsuarioAPILocal.getById($stateParams.projetoId).then(function(reqUsu){
                        objVal.requsuario = reqUsu;
                    });
                }
                $scope.reqnaofuncionais.push(objVal)
            });
        });
        
        participantesAPILocal.getByIdProjeto($stateParams.projetoId).then(function(res){
            $scope.participantes = res;
        });
    }
    
    $scope.imprimir = function () {
        var page = document.getElementById('conteudo-impressao');
        cordova.plugins.printer.print(page, {'name':'sers-relatorio.html'});
    };
    
    $scope.descTipoRequisito = function (id) {
        if (id == 1) {
            return "Funcional";
        } else if (id == 2) {
            return "Não Funcional";
        } else {
            return null;
        }
    }
    
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
});

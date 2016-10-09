app.controller('SecoesCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, secoesAPILocal) {

    setInitSecoes();

    if (Number($stateParams.projetoId)) {

        Promise.resolve(projetoAPILocal.getById($stateParams.projetoId)).then(
                function (res) {
                    $scope.projeto = res;
                }
        );

        Promise.resolve(secoesAPILocal.getByIdProjeto($stateParams.projetoId)).then(
                function (res) {
                    setInitSecoes();
                    angular.merge($scope.secoes, res);
                }
        );
    }

    $scope.salvarSecoes = function (secoes) {
        secoes.id_projeto = $stateParams.projetoId;
        if (Number(secoes.id)) {
            secoesAPILocal.edit(secoes);
        } else {
            secoesAPILocal.insert(secoes);
        }
    };

    function setInitSecoes() {
        $scope.secoes = {id_projeto: null, proposito: null, escopo: null, def_acron_abrev: null, referencias: null, organizacao: null, perspectiva: null, funcionalidades: null, caracteristicas_utilizador: null, restricoes: null, assuncoes_dependencias: null};
    }
    ;

});
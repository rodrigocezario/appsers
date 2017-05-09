app.controller('RelatorioCtrl', function ($scope, $stateParams, projetoAPILocal) {
    if (Number($stateParams.projetoId)) {
        projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
            $scope.projeto = res;
        });
    }
    $scope.imprimir = function () {
        var page = document.getElementById('conteudo-impressao');
        cordova.plugins.printer.print(page, {'name':'sers-relatorio.html'});
    };
});

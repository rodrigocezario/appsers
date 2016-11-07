app.controller('ProjetoListCtrl', function ($scope, $state, ionicMaterialMotion, utilAPI, projetoAPILocal) {
    
    $scope.$on('$ionicView.enter', function () {
        atualizaLista();
    });
    
    $scope.excluir = function (item) {
        utilAPI.confirmarExclusao().then(function (res) {
            if (res) {
                projetoAPILocal.delete(item.id).then(function () {
                    projetoAPILocal.deleteChilds(item.id);
                    //utilAPI.avisoTemp("Registro excluído com sucesso");
                    atualizaLista();
                });
            }
        });
    };

    $scope.editar = function (item) {
        $state.go("app.projeto-menu", {'projetoId': item.id});
    };
    
    $scope.incluir = function () {
        $state.go("app.projeto-add");
    };
    
    function atualizaLista() {
        projetoAPILocal.get().then(function(res){
            $scope.projetos = res;
        });
        $scope.blinds();
    }
    
    $scope.blinds = function () {
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    }
});
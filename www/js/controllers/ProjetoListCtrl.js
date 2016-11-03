app.controller('ProjetoListCtrl', function ($scope, $state, ionicMaterialMotion, utilAPI, projetoAPILocal) {
    
    $scope.$on('$ionicView.enter', function () {
        atualizaLista();
    });
    
    $scope.excluir = function (item) {
        utilAPI.confirmarExclusao().then(function (res) {
            if (res) {
                projetoAPILocal.delete(item.id).then(function () {
                    //utilAPI.avisoTemp("Registro excluído com sucesso");
                    atualizaLista();
                });
            }
        });
    };

    $scope.editar = function (item) {
        $state.go("app.projeto-menu", {'projetoId': item.id});
    };
    
    function atualizaLista() {
        projetoAPILocal.get().then(function(res){
            $scope.projetos = res;
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
    }

    $scope.blinds = function () {
        resetEffect();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function () {
            ionicMaterialMotion.blinds();
        }, 100);
    }
});
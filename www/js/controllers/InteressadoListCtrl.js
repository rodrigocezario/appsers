app.controller('InteressadoListCtrl', function ($scope, $state, $stateParams, ionicMaterialMotion, utilAPI, projetoAPILocal, interessadosAPILocal) {

    $scope.$on('$ionicView.enter', function () {
        if (Number($stateParams.projetoId)) {
            projetoAPILocal.getById($stateParams.projetoId).then(function (res) {
                $scope.projeto = res;
            });
        }
        atualizaLista();
    });

    $scope.excluir = function (item) {
        utilAPI.confirmarExclusao().then(function (res) {
            if (res) {
                interessadosAPILocal.delete(item.id).then(function () {
                    //utilAPI.avisoTemp("Registro excluído com sucesso");
                    atualizaLista();
                });
            }
        });
    };

    $scope.editar = function (item) {
        $state.go("app.projeto-interessados-cadastro", {'projetoId': item.id_projeto, 'interessadoId': item.id});
    };

    function atualizaLista() {
        interessadosAPILocal.getByIdProjeto($stateParams.projetoId).then(function (res) {
            $scope.interessados = res;
            $scope.blinds;
        });
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

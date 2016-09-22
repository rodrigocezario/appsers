app.controller('ProjetosCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetosAPILocal) {

    //atualiza exibição da lista ao voltar do cadastro
    $scope.$on('$ionicView.enter', function() {
       $scope.projetos = projetosAPILocal.get();
       $scope.blinds();
    });

    //métodos para manter projeto
    if(Number($stateParams.projetoId)){
        Promise.resolve( projetosAPILocal.getById($stateParams.projetoId) ).then(
            function(res) {
                $scope.projeto = res;
            }
        );
    }

    $scope.salvarProjeto = function (projeto) {
        if(Number($stateParams.projetoId)){
            projetosAPILocal.edit(projeto);
        }else{
            projeto.dt_criacao = new Date();
            projetosAPILocal.insert(projeto);
        }
    };

    //metodos para efeito visual
    var resetEffect = function() {
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

    $scope.blinds = function() {
        resetEffect();
        document.getElementsByTagName('ion-list')[0].className += ' animate-blinds';
        setTimeout(function() {
            ionicMaterialMotion.blinds();
        }, 100);
    };

    $scope.blinds();

    //metodos da listagem de projetos
    if(!$stateParams.projetoId){
        var btnIncluir = document.getElementById('btn-incluir');
        btnIncluir.addEventListener('click', function () {
            location.href = '/#/app/projetos/add';
        });
    }
    
});
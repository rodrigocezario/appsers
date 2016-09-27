app.controller('InteressadoCtrl', function ($scope, $stateParams, ionicMaterialMotion, projetoAPILocal, interessadosAPILocal) {

    setInitInteressado();

	//métodos para manter um interessado
    if(Number($stateParams.interessadoId)){
        Promise.resolve( interessadosAPILocal.getById($stateParams.interessadoId) ).then(
            function(res) {
                angular.merge($scope.interessado, res);
            }
        );
    }

    if(Number($stateParams.projetoId)){
        Promise.resolve( projetoAPILocal.getById($stateParams.projetoId) ).then(
            function(res) {
                $scope.projeto = res;
            }
        )        
        //atualiza exibição da lista ao voltar do cadastro
        $scope.$on('$ionicView.enter', function() {
            $scope.interessados = interessadosAPILocal.getByIdProjeto($stateParams.projetoId);
            $scope.blinds();
        });
    }

    $scope.salvarInteressado = function (interessado) {
        interessado.id_projeto = $stateParams.projetoId;
        if(Number($stateParams.interessadoId)){
            interessadosAPILocal.edit(interessado);
        }else{
            interessadosAPILocal.insert(interessado);
        }
    };
    

    //metodos para inicializar formularios
    function setInitInteressado(){
        $scope.interessado = { id_projeto:null, nome:null, papel:null, funcao:null, email:null, telefone:null};
    };

    var btnIncluir = document.getElementById('btn-incluir');
    btnIncluir.addEventListener('click', function () {
        location.href = '#/app/projetos/'+$stateParams.projetoId+'/interessados/cadastro';
    });


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


});
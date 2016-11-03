app.controller('AppCtrl', function ($scope, $state, $ionicHistory, usuarioAPILocal) {

    $scope.menus = [
        {id: 1, descricao: "Projetos", href: "#/app/projetos"},
        {id: 2, descricao: "Configurações", href: "#/app/config"}
    ];
    
    $scope.ocultarMenu = function(){
        return ($state.current.name == 'app.login' || $state.current.name == 'app.conta');
    };
    
    $scope.$on('$ionicView.enter', function () {
        usuarioAPILocal.get().then(function (res) {
            if (!res[0] && $state.current.name != 'app.conta') {
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go("app.login");
            }else{
                if(res[0].nome){
                    $scope.tituloMenu = res[0].nome;
                }
            }
        });
    });
    
    
});
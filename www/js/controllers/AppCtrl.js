app.controller('AppCtrl', function ($scope, $state, $ionicHistory, $ionicSideMenuDelegate, usuarioAPILocal) {

    $scope.menus = [
        {id: 1, descricao: "Projetos", href: "#/app/projetos"},
        {id: 2, descricao: "Configurações", href: "#/app/config"}
    ];

    $scope.ocultarMenu = function () {
        return ($state.current.name == 'app.login' || $state.current.name == 'app.conta');
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        if (!$scope.usuarioLogin && $state.current.name != 'app.login' && $state.current.name != 'app.conta') {
            usuarioAPILocal.get().then(function (res) {
                if (res[0]) {
                    $scope.usuarioLogin = res[0];
                } else {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go("app.login");
                }
            });
        }else if($scope.usuarioLogin && $state.current.name == 'app.login'){
            $state.go("app.projetos");
            $ionicSideMenuDelegate.canDragContent(true);
        }
    });
});
app.controller('AppCtrl', function ($scope, $state) {

    $scope.menus = [
        {id: 1, descricao: "Projetos", href: "#/app/projetos"},
        {id: 2, descricao: "Configurações", href: "#/app/config"}
    ];

    $scope.ocultarMenu = function () {
        return ($state.current.name == 'app.login' || $state.current.name == 'app.conta');
    };
});
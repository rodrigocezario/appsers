app.controller('AppCtrl', function ($scope) {

    $scope.menus = [
        {id: 1, descricao: "Projetos", href: "#/app/projetos"},
        {id: 2, descricao: "Configurações", href: "#/app/config"}
    ];

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function () {
            this.classList.toggle('active');
        });
    }

});
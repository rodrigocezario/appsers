app.controller('AppCtrl', function ($scope, $state, $ionicPopover, $ionicHistory) {

    $scope.menus = [
        {id: 1, descricao: "Projetos", href: "#/app/projetos", icon:"ion-ios-briefcase"},
        {id: 2, descricao: "Minha Conta", href: "#/app/conta", icon:"ion-person"},
        {id: 3, descricao: "Configurações", href: "#/app/config", icon:"ion-ios-gear"}
    ];
    $scope.conta = function () {
        $state.go("app.conta").then();
    };
    $scope.selecionaPopover = function (opcao) {
        console.log(opcao);
        if (opcao == 1) {
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $state.go("app.projetos").then();
            $scope.popover.hide();
        } else if (opcao == 2) {
            $state.go("app.conta").then();
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $scope.popover.hide();
        } else if (opcao == 3) {
            $state.go("app.config").then();
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $scope.popover.hide();
        }
    };
    var template = "";
    template = template + "<ion-popover-view style='max-height: 155px'>";
    template = template + " <ion-item ng-click='selecionaPopover(1)'>";
    template = template + "     <div class='item-icon-left'>";
    template = template + "         <i class='icon ion-ios-briefcase'></i>";
    template = template + "         <p>Projetos</p>";
    template = template + "     </div>";
    template = template + " </ion-item>";
    template = template + " <ion-item ng-click='selecionaPopover(2)'>";
    template = template + "     <div class='item-icon-left'>";
    template = template + "         <i class='icon ion-person'></i>";
    template = template + "         <p>Minha Conta</p>";
    template = template + "     </div>";
    template = template + " </ion-item>";
    template = template + " <ion-item ng-click='selecionaPopover(3)'>";
    template = template + "     <div class='item-icon-left'>";
    template = template + "         <i class='icon ion-ios-gear'></i>";
    template = template + "         <p>Configurações</p>";
    template = template + "     </div>";
    template = template + " </ion-item>";
    template = template + "</ion-popover-view>";
    $scope.popover = $ionicPopover.fromTemplate(template, {
        scope: $scope
    });
});
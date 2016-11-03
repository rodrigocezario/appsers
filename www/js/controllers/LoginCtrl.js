app.controller('LoginCtrl', function ($scope, $state, $ionicHistory, utilAPI, usuarioAPILocal) {

    $scope.$on('$ionicView.enter', function () {
        setInitLogin();
    });

    $scope.entrar = function (login) {
        if (login) {
            if (login.senha) {
                //Implementar rotina para consultar dados do servidor. Hoje esta considerando apenas o usuário cadastrado localmente.
                usuarioAPILocal.get().then(function (res) {
                    if (res[0]) {
                        $state.go("app.projetos");
                        $ionicHistory.nextViewOptions({
                            disableBack: true
                        });
                    } else {
                        setInitLogin();
                        utilAPI.avisoTemp("Usuário e senha não encontrado!");
                    }
                });
            }

        }
    };

    $scope.criarConta = function (login) {
        if (login && login.email) {
            $state.go("app.conta", {'email': login.email});
        } else {
            $state.go("app.conta");
        }
    }

    //metodos para inicializar formularios
    function setInitLogin() {
        if ($scope.login) {
            if ($scope.login.senha) {
                $scope.login.senha = null
                return;
            }
            if ($scope.login.email) {
                return;
            }
        }
        $scope.login = {email: null, senha: null};
    }
});
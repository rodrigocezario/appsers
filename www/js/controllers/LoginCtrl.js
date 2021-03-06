app.controller('LoginCtrl', function ($scope, $state, $ionicHistory, $ionicSideMenuDelegate, utilAPI, usuarioAPILocal, md5) {

    $scope.$on('$ionicView.beforeEnter', function () {
        $ionicSideMenuDelegate.canDragContent(false);
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        setInitLogin();
    });

    $scope.entrar = function (formValido) {
        if (formValido) {
            var login = $scope.login;
            if (login) {
                //Implementar rotina para consultar dados do servidor validando pelo token. Hoje esta considerando apenas o usuário cadastrado localmente.
                usuarioAPILocal.getByEmailSenha(login.email, md5.createHash(login.senha)).then(function (res) {
                    if (res) {
                        usuarioLogin = res;
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
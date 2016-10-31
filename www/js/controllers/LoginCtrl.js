app.controller('LoginCtrl', function ($scope, $state, usuarioAPILocal, md5) {
    /*usuarioAPILocal.get().then(function (res) {
        if(!res[0]){
            $state.go("app.login");
        }else{
            $state.go("app.projetos");
        }
    });*/
    
    $scope.entrar = function(login) {
        if(login){
            if(login.senha){
                //implementar rotina para consultar dados no servidor remoto
                usuarioAPILocal.get().then(function (res) {
                    if(res[0]){
                        $state.go("app.projetos");
                    }else{
                        alert("Usuário e senha não encontrado");
                    }
                });
            }
            
        }
    };
    
    $scope.criarConta = function(login) {
        if(login && login.email){
            $state.go("app.conta", {'email': login.email});
        }else{
            $state.go("app.conta");
        }
    }
});
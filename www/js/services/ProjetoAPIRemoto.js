angular.module("appsers").factory("projetoAPIRemoto", function ($http, config) {
    var _getProjetos = function () {
        return $http.get(config.baseUrl + "/projetos");
    };

    var _setProjeto = function (projeto) {
        return $http.post(config.baseUrl + "/projetos", projeto);
    };

    return {
        getProjetos: _getProjetos,
        setProjeto: _setProjeto
    };
});
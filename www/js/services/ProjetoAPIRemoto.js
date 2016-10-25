angular.module("appsers").factory("projetoAPIRemoto", function ($http, config) {
    var self = this;
    
    self.getProjetos = function () {
        return $http.get(config.baseUrl + "/projetos");
    }

    self.setProjeto = function (projeto) {
        return $http.post(config.baseUrl + "/projetos", projeto);
    }

    return self;
});
app.factory("secoesAPILocal", function (dbAPILocal) {
    var self = this;

    self.get = function () {
        return dbAPILocal.query("SELECT * FROM secoes").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM secoes WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getByIdProjeto = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM secoes WHERE id_projeto = ? LIMIT 1", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.insert = function(secao) {
        var parameters = [secao.id_projeto, secao.proposito, secao.escopo, secao.def_acron_abrev, secao.referencias, secao.organizacao, secao.perspectiva, secao.funcionalidades, secao.caracteristicas_utilizador, secao.restricoes, secao.assuncoes_dependencias, usuarioLogin.id];
        return dbAPILocal.query("INSERT INTO secoes (id_projeto, proposito, escopo, def_acron_abrev, referencias, organizacao, perspectiva, funcionalidades, caracteristicas_utilizador, restricoes, assuncoes_dependencias, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", parameters);
    }
    
    self.edit = function(secao) {
        var parameters = [secao.id_projeto, secao.proposito, secao.escopo, secao.def_acron_abrev, secao.referencias, secao.organizacao, secao.perspectiva, secao.funcionalidades, secao.caracteristicas_utilizador, secao.restricoes, secao.assuncoes_dependencias, secao.id_usuario, secao.id];
        return dbAPILocal.query("UPDATE secoes SET id_projeto = ?, proposito = ?, escopo = ?, def_acron_abrev = ?, referencias = ?, organizacao = ?, perspectiva = ?, funcionalidades = ?, caracteristicas_utilizador = ?, restricoes = ?, assuncoes_dependencias = ?, id_usuario = ? WHERE id = ?", parameters);
    }
    
    return self;
});
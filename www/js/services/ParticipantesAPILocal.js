app.factory("participantesAPILocal", function (dbAPILocal) {
    var self = this;
    
    self.get = function () {
        return dbAPILocal.query("SELECT * FROM participantes p LEFT JOIN usuario u ON (u.id = p.id_usuario) ").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM participantes p LEFT JOIN usuario u ON (u.id = p.id_usuario) WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }

    self.getByIdProjeto = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM participantes p LEFT JOIN usuario u ON (u.id = p.id_usuario) WHERE id_projeto = ?", parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.insert = function (id_projeto, id_usuario) {
        var parameters = [id_projeto, id_usuario];
        return dbAPILocal.query("INSERT INTO participantes (id_projeto, id_usuario) VALUES (?, ?)", parameters);
    }

    self.delete = function (id) {
        var parameters = [id];
        return dbAPILocal.query("DELETE FROM participantes WHERE id = ?", parameters);
    }
    
    self.deleteByIdUsuario = function (id_usuario) {
        var parameters = [id_usuario];
        return dbAPILocal.query("DELETE FROM participantes WHERE id_usuario = ?", parameters);
    }
    
    self.deleteByIdProjeto = function (id_projeto) {
        var parameters = [id_projeto];
        return dbAPILocal.query("DELETE FROM participantes WHERE id_projeto = ?", parameters);
    }
    
    return self;
});

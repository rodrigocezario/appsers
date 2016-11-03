app.factory("interessadosAPILocal", function (dbAPILocal) {
    var self = this;
    
    self.get = function () {
        return dbAPILocal.query("SELECT * FROM interessados").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM interessados WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getByIdProjeto = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM interessados WHERE id_projeto = ?", parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.insert = function(interessado) {
        var parameters = [interessado.id_projeto, interessado.nome, interessado.papel, interessado.funcao, interessado.email, interessado.telefone];
        return dbAPILocal.query("INSERT INTO interessados (id_projeto, nome, papel, funcao, email, telefone) VALUES (?, ?, ?, ?, ?, ?)", parameters);
    }
    
    self.edit = function(interessado) {
        var parameters = [interessado.id_projeto, interessado.nome, interessado.papel, interessado.funcao, interessado.email, interessado.telefone, interessado.id];
        return dbAPILocal.query("UPDATE interessados SET id_projeto = ?, nome = ?, papel = ?, funcao = ?, email = ?, telefone = ? WHERE id = ?", parameters);
    }
    
    self.delete = function(id) {
        var parameters = [id];
        return dbAPILocal.query("DELETE FROM interessados WHERE id = ?", parameters);
    }
    
    return self;
    
});
app.factory("usuarioAPILocal", function (dbAPILocal) {
    var self = this;
    
    self.get = function () {
        return dbAPILocal.query("SELECT * FROM usuario").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }
    
    self.getById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM usuario WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getByEmailSenha = function (email, senha) {
        var parameters = [email, senha];
        return dbAPILocal.query("SELECT * FROM usuario WHERE email = ? AND senha = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }
    
    self.getLastInsertId = function(){
        return dbAPILocal.query("SELECT last_insert_rowid() AS id FROM usuario LIMIT 1").then(function(result){
            return dbAPILocal.getById(result);
        });
    }
    
    self.delete = function() {
        return dbAPILocal.query("DELETE FROM usuario");
    }
    
    self.insert = function(usuario) {
        var parameters = [usuario.nome, usuario.email, usuario.senha];
        return dbAPILocal.query("INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)", parameters);
    }
    
    self.edit = function(usuario) {
        var parameters = [usuario.nome, usuario.email, usuario.senha];
        return dbAPILocal.query("UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?", parameters);
    }
    
    return self;
});
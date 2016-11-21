app.factory("padraoAPILocal", function (dbAPILocal) {
    var self = this;

    self.get = function () {
        return dbAPILocal.query("SELECT p.*, c.descricao AS categoria, c.tipo AS tipo_categoria FROM padrao p LEFT JOIN padrao_categoria c ON (c.id = p.id_categoria) ORDER BY c.descricao, p.nome").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    /*self.getByFiltro = function (filtro) {
        var parameters = [];
        var query = "SELECT * FROM padrao p LEFT JOIN padrao_categoria c ON (c.id = p.id_categoria) WHERE 1 ";
        if (filtro && filtro.termo) {
            parameters.push('%'+filtro.termo+'%');
            query += "AND COALESCE(p.nome,'')||'#'||COALESCE(p.objetivo,'')||'#'||COALESCE(p.contexto,'')||'#'||COALESCE(p.problema,'') LIKE ? ";
        }
        if(filtro && filtro.id_categoria){
            parameters.push(filtro.id_categoria);
            query += "AND p.id_categoria = ? "
        }else if(filtro && filtro.tipo_categoria){
            parameters.push(filtro.tipo_categoria);
            query += "AND c.tipo = ? "
        }
        query += "ORDER BY c.descricao, p.nome"
        console.log(query);
        console.log(parameters);
        return dbAPILocal.query(query, parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }*/

    self.getCategoria = function () {
        return dbAPILocal.query("SELECT * FROM padrao_categoria").then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.getCategoriaById = function (id) {
        var parameters = [id];
        return dbAPILocal.query("SELECT * FROM padrao_categoria WHERE id = ?", parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }

    return self;

});
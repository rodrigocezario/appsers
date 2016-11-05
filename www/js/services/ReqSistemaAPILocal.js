app.factory("reqSistemaAPILocal", function (dbAPILocal) {
    var self = this;

    self.get = function () {
        var query =
                "SELECT " +
                "   rs.*, " +
                "   (SELECT COUNT(rs2.id) FROM requisito_sistema rs2 LEFT JOIN requisito_sistema_projeto rsp2 ON (rsp2.id_requisito_sistema = rs2.id) WHERE rs2.id <= rs.id AND rsp2.id_projeto = rsp.id_projeto AND rs2.tipo = rs.tipo) AS id_requisito, " +
                "   rsp.id AS id_req_sistema_projeto, " +
                "   rsp.id_requisito_usuario, " +
                "   rsp.reuso, " +
                "   rsp.id_projeto, " +
                "   rsp.id_vinculo, " +
                "   rsp.importancia, " +
                "   rsp.urgencia, " +
                "   rsp.observacao " +
                "FROM requisito_sistema rs " +
                "LEFT JOIN requisito_sistema_projeto rsp ON (rsp.id_requisito_sistema = rs.id) " +
                "ORDER BY rs.id";
        return dbAPILocal.query(query).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.getById = function (id) {
        var parameters = [id];
        var query =
                "SELECT " +
                "   rs.*, " +
                "   (SELECT COUNT(rs2.id) FROM requisito_sistema rs2 LEFT JOIN requisito_sistema_projeto rsp2 ON (rsp2.id_requisito_sistema = rs2.id) WHERE rs2.id <= rs.id AND rsp2.id_projeto = rsp.id_projeto AND rs2.tipo = rs.tipo) AS id_requisito, " +
                "   rsp.id AS id_req_sistema_projeto, " +
                "   rsp.id_requisito_usuario, " +
                "   rsp.reuso, " +
                "   rsp.id_projeto, " +
                "   rsp.id_vinculo, " +
                "   rsp.importancia, " +
                "   rsp.urgencia, " +
                "   rsp.observacao " +
                "FROM requisito_sistema rs " +
                "LEFT JOIN requisito_sistema_projeto rsp ON (rsp.id_requisito_sistema = rs.id) " +
                "WHERE rs.id = ? ";
        return dbAPILocal.query(query, parameters).then(function (result) {
            return dbAPILocal.getById(result);
        });
    }

    self.getByIdProjeto = function (idProjeto, tipoRequisito = null) {
        var parameters = [idProjeto];
        var query =
                "SELECT " +
                "   rs.*, " +
                "   (SELECT COUNT(rs2.id) FROM requisito_sistema rs2 LEFT JOIN requisito_sistema_projeto rsp2 ON (rsp2.id_requisito_sistema = rs2.id) WHERE rs2.id <= rs.id AND rsp2.id_projeto = rsp.id_projeto AND rs2.tipo = rs.tipo) AS id_requisito, " +
                "   rsp.id AS id_req_sistema_projeto, " +
                "   rsp.id_requisito_usuario, " +
                "   rsp.reuso, " +
                "   rsp.id_projeto, " +
                "   rsp.id_vinculo, " +
                "   rsp.importancia, " +
                "   rsp.urgencia, " +
                "   rsp.observacao " +
                "FROM requisito_sistema rs " +
                "LEFT JOIN requisito_sistema_projeto rsp ON (rsp.id_requisito_sistema = rs.id) " +
                "WHERE rsp.id_projeto = ? ";
        if (tipoRequisito) {
            parameters.push(tipoRequisito);
            query += "AND rs.tipo = ? ";
        }
        query += "ORDER BY rs.id";
        return dbAPILocal.query(query, parameters).then(function (result) {
            return dbAPILocal.getAll(result);
        });
    }

    self.delete = function (id) {
        var parameters = [id];
        return dbAPILocal.query("DELETE FROM requisito_sistema WHERE id = ?", parameters);
    }
    
    self.deleteReqSisProjeto = function (idReqSisProjeto) {
        var parameters = [idReqSisProjeto];
        return dbAPILocal.query("DELETE FROM requisito_sistema_projeto WHERE id = ?", parameters);
    }

    self.deleteChilds = function () {//excluir requisitos sem uso;
        dbAPILocal.query("DELETE FROM requisito_sistema_projeto WHERE NOT EXISTS(SELECT rs.id FROM requisito_sistema rs WHERE rs.id = id_requisito_sistema)").then();
    }
    
    self.deleteFathers = function () { //excluir requisito de sistema sem uso;
        dbAPILocal.query("DELETE FROM requisito_sistema WHERE NOT EXISTS(SELECT rsp.id FROM requisito_sistema_projeto rsp WHERE rsp.id_requisito_sistema = requisito_sistema.id)").then();
    }
    return self;
});
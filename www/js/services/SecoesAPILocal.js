app.factory("secoesAPILocal", function ($cordovaSQLite) {
	
	var _get = function() {
		var retorno = [];
		$cordovaSQLite.execute(db, "SELECT * FROM secoes").then(
			function(res) {
				if (res.rows.length > 0) {
					for (var i = 0; i < res.rows.length; i++) {
						retorno.push(res.rows.item(i));
					}
				}else{
					console.log('No records found');
				}
			}
		);
		return retorno;
	};
	
	var _getById = function(id) {
		return $cordovaSQLite.execute(db, "SELECT * FROM secoes WHERE id = ?", [id]).then(
			function(res) {
				if (res.rows.length > 0) {
					return res.rows.item(0);
				}else{
					console.log('No records found');
				}
			}
		);
	};

	var _getByIdProjeto = function(id) {
		return $cordovaSQLite.execute(db, "SELECT * FROM secoes WHERE id_projeto = ? LIMIT 1", [id]).then(
			function(res) {
				if (res.rows.length > 0) {
					return res.rows.item(0);
				}else{
					console.log('No records found');
				}
			}
		);
	};

	var _insert = function(secao) {
		var query = "INSERT INTO secoes (id_projeto, proposito, escopo, def_acron_abrev, referencias, organizacao, perspectiva, funcionalidades, caracteristicas_utilizador, restricoes, assuncoes_dependencias) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
		var values = [secao.id_projeto, secao.proposito, secao.escopo, secao.def_acron_abrev, secao.referencias, secao.organizacao, secao.perspectiva, secao.funcionalidades, secao.caracteristicas_utilizador, secao.restricoes, secao.assuncoes_dependencias];

		$cordovaSQLite.execute(db, query, values).then(
			function(res) {
				console.log('INSERTED ID: '+res.insertId);
			},
			function(err) {
				console.log('ERROR: '+err);
			}
		);
	};

	var _edit = function(secao) {
		var query = "UPDATE secoes SET id_projeto = ?, proposito = ?, escopo = ?, def_acron_abrev = ?, referencias = ?, organizacao = ?, perspectiva = ?, funcionalidades = ?, caracteristicas_utilizador = ?, restricoes = ?, assuncoes_dependencias = ? WHERE id = ?";
		var values = [secao.id_projeto, secao.proposito, secao.escopo, secao.def_acron_abrev, secao.referencias, secao.organizacao, secao.perspectiva, secao.funcionalidades, secao.caracteristicas_utilizador, secao.restricoes, secao.assuncoes_dependencias, secao.id];

		$cordovaSQLite.execute(db, query, values).then(
			function(res) {
				console.log('UPDATE ID: '+secao.id);
			},
			function(err) {
				console.log('ERROR: '+err);
			}
		);
	};
	
	return {
		get: _get,
		getById: _getById,
		getByIdProjeto: _getByIdProjeto,
		insert: _insert,
		edit: _edit
	};
});
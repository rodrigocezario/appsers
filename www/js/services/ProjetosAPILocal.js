angular.module("appsers").factory("projetosAPILocal", function ($cordovaSQLite) {
	 
	var _get = function() {
		var retorno = [];
		$cordovaSQLite.execute(db, "SELECT * FROM projetos").then(
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
		return $cordovaSQLite.execute(db, "SELECT * FROM projetos WHERE id_ = ?", [id]).then(
			function(res) {
				if (res.rows.length > 0) {
					return res.rows.item(0);
				}else{
					console.log('No records found');
				}
			}
		);
	};

	var _insert = function(projeto) {
		var query = "INSERT INTO projetos (nome, descricao, empresa, responsavel, compartilhado, dt_criacao, dt_finalizado) VALUES (?, ?, ?, ?, ?, ?, ?);";
		var values = [ projeto.nome, projeto.descricao, projeto.empresa, projeto.responsavel, projeto.compartilhado, projeto.dt_criacao, projeto.dt_finalizado];

		$cordovaSQLite.execute(db, query, values).then(
			function(res) {
				console.log('INSERTED ID: '+res.insertId);
			},
			function(err) {
				console.log('ERROR: '+err);
			}
		);
	};

	var _edit = function(projeto) {
		var query = "UPDATE projetos SET nome = ?, descricao = ?, empresa = ?, responsavel = ?, compartilhado = ?, dt_criacao = ?, dt_finalizado = ? WHERE id_ = ?";
		var values = [ projeto.nome, projeto.descricao, projeto.empresa, projeto.responsavel, projeto.compartilhado, projeto.dt_criacao, projeto.dt_finalizado, projeto.id_];

		$cordovaSQLite.execute(db, query, values).then(
			function(res) {
				console.log('UPDATE ID: '+projeto.id_);
			},
			function(err) {
				console.log('ERROR: '+err);
			}
		);
	};
	
	return {
		get: _get,
		getById: _getById,
		insert: _insert,
		edit: _edit
	};
});
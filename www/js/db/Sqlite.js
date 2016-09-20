
//var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

/*sqlite.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    if (window.cordova) {
		db = $cordovaSQLite.openDB({ name: "db_sers.db"});
    }else{
	    db = window.openDatabase("db_sers.db", '1.0', 'my', -1); // browser
    }
    //$cordovaSQLite.deleteDB("db_sers.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS projetos (id_ INTEGER PRIMARY KEY, nome TEXT, descricao TEXT, empresa TEXT, responsavel TEXT, compartilhado INTEGER DEFAULT 0, dt_criacao TEXT, dt_finalizado TEXT)");
  });
});*/


/*
sqlite.factory('projetosFactory', function($cordovaSQLite) {
	return {
		insert : function(nome, descricao, empresa, responsavel, compartilhado, dt_criacao, dt_finalizado) {
			var query = "INSERT INTO projetos (nome, descricao, empresa, responsavel, compartilhado, dt_criacao, dt_finalizado) VALUES (?, ?, ?, ?, ?, ?, ?);";
			var values = [nome, descricao, empresa, responsavel, compartilhado, dt_criacao, dt_finalizado];

			$cordovaSQLite.execute(db, query, values).then(
				function(res) {
					console.log('INSERTED ID: '+res.insertId);
				},
				function(err) {
					console.log('ERROR: '+err);
				}
			);
		},
		select : function(id) {
			var query = "SELECT * FROM projetos WHERE id=?";
			var values = [id];

			$cordovaSQLite.execute(db, query, values).then(
				function(res) {
					if (res.rows.length > 0) {
						var first = res.rows.item(0);
						console.log(res.rows.length + ' records, fist: ' + first.nome + ' ' + first.descricao + ' - ' + first.empresa);
					} else {
						console.log('No records found');
					}
				}
			);
		}
	}
});*/


(function () {

var config = {
	baseUrl: 'scripts',
	paths: {
		'jquery': '../bower_components/jquery/dist/jquery',
		'underscore': '../bower_components/underscore/underscore',
		'ok': '../bower_components/okaylib/ok',
		'ok.views': '../bower_components/okaylib/ok.views',
		'ok.dollarview': '../bower_components/okaylib/ok.dollarview',
		'text': '../bower_components/text/text',
		'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
		'signals': '../bower_components/js-signals/dist/signals',
		'crossroads': '../bower_components/crossroads.js/dist/crossroads',
		'marked': '../bower_components/marked/lib/marked',
		'moment': '../bower_components/moment/moment',
		'bluebird': '../bower_components/bluebird/js/browser/bluebird',
		'querystring': '../bower_components/query-string/query-string'
	},
	shim: {
		'ok.views': {
			deps: ['ok'],
			exports: 'ok'
		},
		'ok.dollarview': {
			deps: ['ok', 'ok.views', 'jquery'],
			exports: 'ok'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'jquery'
		}
	},
	map: {
		'*': {
			'jquery': 'lib/jquery-custom',
			'ok': 'lib/ok-custom'
		},
		'lib/jquery-custom': {
			'jquery': 'jquery'
		},
		'lib/ok-custom': {
			'ok': 'ok'
		}
	}
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = config;
}
else if (typeof requirejs !== 'undefined' && requirejs.config) {
	requirejs.config(config);
}

})();
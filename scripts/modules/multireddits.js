define(function (require, exports) {
	var ok = require('ok');
	var _ = require('underscore');
	var SubredditModel = require('models/SubredditModel');

	var MultiredditCollection = ok.Collection.extend({
		defaultConstructor: SubredditModel,
		getConstructor: function (map) {
			if (typeof map.id === 'string') {
				return SubredditModel;
			}
			else {
				return MultiredditModel;
			}
		},
		toString: function () {
			return _.invoke(this.items, 'toString').join('+');
		}
	});

	var MultiredditModel = ok.Map.extend({
		schema: {
			children: MultiredditCollection
		},
		defaults: {
			name: null,
			children: null
		},
		toString: function () {
			return this.properties.children.toString();
		}
	});

	exports.MultiredditCollection = MultiredditCollection;
	exports.MultiredditModel = MultiredditModel;
	exports.SubredditModel = SubredditModel;
});
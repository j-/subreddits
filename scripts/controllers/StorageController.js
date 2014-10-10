define(function (require) {
	var ok = require('ok');
	var StorageController = ok.Controller.extend({
		init: function (options) {
			this.watch = options.watch;
			this.storageKey = options.storageKey;
		},
		save: function () {
			var data = this.watch.get();
			var json = JSON.stringify(data);
			localStorage.setItem(this.storageKey, json);
		},
		load: function () {
			var json = localStorage.getItem(this.storageKey);
			var data = JSON.parse(json);
			this.watch.set(data);
		},
		export: function () {
			return this.watch.get();
		},
		import: function (data) {
			this.watch.set(data);
		}
	});
	return StorageController;
});
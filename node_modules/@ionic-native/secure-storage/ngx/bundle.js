'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var SecureStorageObject = /** @class */ (function () {
    function SecureStorageObject(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    SecureStorageObject.prototype.get = function (key) { return core.cordovaInstance(this, "get", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.set = function (key, value) { return core.cordovaInstance(this, "set", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.remove = function (key) { return core.cordovaInstance(this, "remove", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.keys = function () { return core.cordovaInstance(this, "keys", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.clear = function () { return core.cordovaInstance(this, "clear", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.secureDevice = function () { return core.cordovaInstance(this, "secureDevice", {}, arguments); };
    return SecureStorageObject;
}());
var SecureStorage = /** @class */ (function (_super) {
    tslib.__extends(SecureStorage, _super);
    function SecureStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecureStorage.prototype.create = function (store) {
        var _this = this;
        return (function () {
            if (core.checkAvailability(_this) === true) {
                return core.getPromise(function (res, rej) {
                    var instance = new (SecureStorage.getPlugin())(function () { return res(new SecureStorageObject(instance)); }, function () { return rej(new SecureStorageObject(instance)); }, store);
                });
            }
        })();
    };
    SecureStorage.pluginName = "SecureStorage";
    SecureStorage.plugin = "cordova-plugin-secure-storage-echo";
    SecureStorage.pluginRef = "cordova.plugins.SecureStorage";
    SecureStorage.repo = "https://github.com/mibrito707/cordova-plugin-secure-storage-echo";
    SecureStorage.platforms = ["Android", "Browser", "iOS", "Windows"];
    SecureStorage.decorators = [
        { type: core$1.Injectable }
    ];
    return SecureStorage;
}(core.IonicNativePlugin));

exports.SecureStorage = SecureStorage;
exports.SecureStorageObject = SecureStorageObject;

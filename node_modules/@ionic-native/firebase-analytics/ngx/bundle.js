'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var FirebaseAnalytics = /** @class */ (function (_super) {
    tslib.__extends(FirebaseAnalytics, _super);
    function FirebaseAnalytics() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirebaseAnalytics.prototype.logEvent = function (name, params) { return core.cordova(this, "logEvent", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setUserId = function (id) { return core.cordova(this, "setUserId", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setUserProperty = function (name, value) { return core.cordova(this, "setUserProperty", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setEnabled = function (enabled) { return core.cordova(this, "setEnabled", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.setCurrentScreen = function (name) { return core.cordova(this, "setCurrentScreen", { "sync": true }, arguments); };
    FirebaseAnalytics.prototype.resetAnalyticsData = function () { return core.cordova(this, "resetAnalyticsData", { "sync": true }, arguments); };
    FirebaseAnalytics.pluginName = "FirebaseAnalytics";
    FirebaseAnalytics.plugin = "cordova-plugin-firebase-analytics";
    FirebaseAnalytics.pluginRef = "cordova.plugins.firebase.analytics";
    FirebaseAnalytics.repo = "https://github.com/chemerisuk/cordova-plugin-firebase-analytics";
    FirebaseAnalytics.platforms = ["Android", "iOS"];
    FirebaseAnalytics.decorators = [
        { type: core$1.Injectable }
    ];
    return FirebaseAnalytics;
}(core.IonicNativePlugin));

exports.FirebaseAnalytics = FirebaseAnalytics;

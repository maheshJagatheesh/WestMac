'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var LaunchNavigator = /** @class */ (function (_super) {
    tslib.__extends(LaunchNavigator, _super);
    function LaunchNavigator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.APP = {
            USER_SELECT: 'user_select',
            APPLE_MAPS: 'apple_maps',
            GOOGLE_MAPS: 'google_maps',
            WAZE: 'waze',
            CITYMAPPER: 'citymapper',
            NAVIGON: 'navigon',
            TRANSIT_APP: 'transit_app',
            YANDEX: 'yandex',
            UBER: 'uber',
            TOMTOM: 'tomtom',
            BING_MAPS: 'bing_maps',
            SYGIC: 'sygic',
            HERE_MAPS: 'here_maps',
            MOOVIT: 'moovit',
        };
        _this.TRANSPORT_MODE = {
            DRIVING: 'driving',
            WALKING: 'walking',
            BICYCLING: 'bicycling',
            TRANSIT: 'transit',
        };
        return _this;
    }
    LaunchNavigator.prototype.navigate = function (destination, options) { return core.cordova(this, "navigate", { "successIndex": 2, "errorIndex": 3 }, arguments); };
    LaunchNavigator.prototype.isAppAvailable = function (app) { return core.cordova(this, "isAppAvailable", {}, arguments); };
    LaunchNavigator.prototype.availableApps = function () { return core.cordova(this, "availableApps", {}, arguments); };
    LaunchNavigator.prototype.getAppDisplayName = function (app) { return core.cordova(this, "getAppDisplayName", { "sync": true }, arguments); };
    LaunchNavigator.prototype.getAppsForPlatform = function (platform) { return core.cordova(this, "getAppsForPlatform", { "sync": true }, arguments); };
    LaunchNavigator.prototype.supportsTransportMode = function (app, platform) { return core.cordova(this, "supportsTransportMode", { "sync": true }, arguments); };
    LaunchNavigator.prototype.getTransportModes = function (app, platform) { return core.cordova(this, "getTransportModes", { "sync": true }, arguments); };
    LaunchNavigator.prototype.supportsDestName = function (app, platform) { return core.cordova(this, "supportsDestName", { "sync": true }, arguments); };
    LaunchNavigator.prototype.supportsStart = function (app, platform) { return core.cordova(this, "supportsStart", { "sync": true }, arguments); };
    LaunchNavigator.prototype.supportsStartName = function (app, platform) { return core.cordova(this, "supportsStartName", { "sync": true }, arguments); };
    LaunchNavigator.prototype.supportsLaunchMode = function (app, platform) { return core.cordova(this, "supportsLaunchMode", { "sync": true }, arguments); };
    LaunchNavigator.prototype.userSelect = function (destination, options) { return core.cordova(this, "userSelect", { "sync": true }, arguments); };
    Object.defineProperty(LaunchNavigator.prototype, "appSelection", {
        get: function () { return core.cordovaPropertyGet(this, "appSelection"); },
        set: function (value) { core.cordovaPropertySet(this, "appSelection", value); },
        enumerable: false,
        configurable: true
    });
    LaunchNavigator.pluginName = "LaunchNavigator";
    LaunchNavigator.plugin = "uk.co.workingedge.phonegap.plugin.launchnavigator";
    LaunchNavigator.pluginRef = "launchnavigator";
    LaunchNavigator.repo = "https://github.com/dpa99c/phonegap-launch-navigator";
    LaunchNavigator.platforms = ["Android", "iOS", "Windows", "Windows Phone 8"];
    LaunchNavigator.decorators = [
        { type: core$1.Injectable }
    ];
    return LaunchNavigator;
}(core.IonicNativePlugin));

exports.LaunchNavigator = LaunchNavigator;

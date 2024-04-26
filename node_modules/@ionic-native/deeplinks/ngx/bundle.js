'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');
require('rxjs');

var Deeplinks = /** @class */ (function (_super) {
    tslib.__extends(Deeplinks, _super);
    function Deeplinks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Deeplinks.prototype.route = function (paths) { return core.cordova(this, "route", { "observable": true }, arguments); };
    Deeplinks.prototype.routeWithNavController = function (navController, paths, options) { return core.cordova(this, "routeWithNavController", { "observable": true }, arguments); };
    Deeplinks.pluginName = "Deeplinks";
    Deeplinks.plugin = "ionic-plugin-deeplinks";
    Deeplinks.pluginRef = "IonicDeeplink";
    Deeplinks.repo = "https://github.com/ionic-team/ionic-plugin-deeplinks";
    Deeplinks.install = "ionic cordova plugin add ionic-plugin-deeplinks --variable URL_SCHEME=myapp --variable DEEPLINK_SCHEME=https --variable DEEPLINK_HOST=example.com --variable ANDROID_PATH_PREFIX=/";
    Deeplinks.installVariables = ["URL_SCHEME", "DEEPLINK_SCHEME", "DEEPLINK_HOST", "ANDROID_PATH_PREFIX"];
    Deeplinks.platforms = ["Android", "Browser", "iOS"];
    Deeplinks.decorators = [
        { type: core$1.Injectable }
    ];
    return Deeplinks;
}(core.IonicNativePlugin));

exports.Deeplinks = Deeplinks;

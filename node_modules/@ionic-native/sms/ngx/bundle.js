'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var core$1 = require('@angular/core');
var core = require('@ionic-native/core');

var SMS = /** @class */ (function (_super) {
    tslib.__extends(SMS, _super);
    function SMS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SMS.prototype.send = function (phoneNumber, message, options) { return core.cordova(this, "send", { "successIndex": 3, "errorIndex": 4 }, arguments); };
    SMS.prototype.hasPermission = function () { return core.cordova(this, "hasPermission", { "platforms": ["Android"] }, arguments); };
    SMS.pluginName = "SMS";
    SMS.plugin = "cordova-sms-plugin";
    SMS.pluginRef = "sms";
    SMS.repo = "https://github.com/cordova-sms/cordova-sms-plugin";
    SMS.platforms = ["Android", "iOS", "Windows", "Windows Phone 8"];
    SMS.decorators = [
        { type: core$1.Injectable }
    ];
    return SMS;
}(core.IonicNativePlugin));

exports.SMS = SMS;

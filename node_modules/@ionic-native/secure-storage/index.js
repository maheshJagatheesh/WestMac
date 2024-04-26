var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { IonicNativePlugin, checkAvailability, cordovaInstance, getPromise } from '@ionic-native/core';
var SecureStorageObject = /** @class */ (function () {
    function SecureStorageObject(_objectInstance) {
        this._objectInstance = _objectInstance;
    }
    SecureStorageObject.prototype.get = function (key) { return cordovaInstance(this, "get", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.set = function (key, value) { return cordovaInstance(this, "set", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.remove = function (key) { return cordovaInstance(this, "remove", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.keys = function () { return cordovaInstance(this, "keys", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.clear = function () { return cordovaInstance(this, "clear", { "callbackOrder": "reverse" }, arguments); };
    SecureStorageObject.prototype.secureDevice = function () { return cordovaInstance(this, "secureDevice", {}, arguments); };
    return SecureStorageObject;
}());
export { SecureStorageObject };
var SecureStorageOriginal = /** @class */ (function (_super) {
    __extends(SecureStorageOriginal, _super);
    function SecureStorageOriginal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecureStorageOriginal.prototype.create = function (store) {
        var _this = this;
        return (function () {
            if (checkAvailability(_this) === true) {
                return getPromise(function (res, rej) {
                    var instance = new (SecureStorageOriginal.getPlugin())(function () { return res(new SecureStorageObject(instance)); }, function () { return rej(new SecureStorageObject(instance)); }, store);
                });
            }
        })();
    };
    SecureStorageOriginal.pluginName = "SecureStorage";
    SecureStorageOriginal.plugin = "cordova-plugin-secure-storage-echo";
    SecureStorageOriginal.pluginRef = "cordova.plugins.SecureStorage";
    SecureStorageOriginal.repo = "https://github.com/mibrito707/cordova-plugin-secure-storage-echo";
    SecureStorageOriginal.platforms = ["Android", "Browser", "iOS", "Windows"];
    return SecureStorageOriginal;
}(IonicNativePlugin));
var SecureStorage = new SecureStorageOriginal();
export { SecureStorage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL3NlY3VyZS1zdG9yYWdlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSxPQUFPLHlEQUE0RCxVQUFVLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUFNeEcsNkJBQW9CLGVBQW9CO1FBQXBCLG9CQUFlLEdBQWYsZUFBZSxDQUFLO0lBQUcsQ0FBQztJQVU1QyxpQ0FBRyxhQUFDLEdBQVc7SUFhZixpQ0FBRyxhQUFDLEdBQVcsRUFBRSxLQUFhO0lBWTlCLG9DQUFNLGFBQUMsR0FBVztJQVdsQixrQ0FBSTtJQVdKLG1DQUFLO0lBU0wsMENBQVk7OEJBekVkOzs7O0lBb0ltQyxpQ0FBaUI7Ozs7SUFPbEQsOEJBQU0sYUFBQyxLQUFhOzs7bURBQWdDO2dCQUNsRCxPQUFPLFVBQVUsQ0FBc0IsVUFBQyxHQUFhLEVBQUUsR0FBYTtvQkFDbEUsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUM5QyxjQUFNLE9BQUEsR0FBRyxDQUFDLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsRUFDNUMsY0FBTSxPQUFBLEdBQUcsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQXRDLENBQXNDLEVBQzVDLEtBQUssQ0FDTixDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO2FBQ0o7Ozs7Ozs7O3dCQW5KSDtFQW9JbUMsaUJBQWlCO1NBQXZDLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb3Jkb3ZhQ2hlY2ssIENvcmRvdmFJbnN0YW5jZSwgSW9uaWNOYXRpdmVQbHVnaW4sIFBsdWdpbiwgZ2V0UHJvbWlzZSB9IGZyb20gJ0Bpb25pYy1uYXRpdmUvY29yZSc7XG5cbi8qKlxuICogQGhpZGRlblxuICovXG5leHBvcnQgY2xhc3MgU2VjdXJlU3RvcmFnZU9iamVjdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX29iamVjdEluc3RhbmNlOiBhbnkpIHt9XG5cbiAgLyoqXG4gICAqIEdldHMgYSBzdG9yZWQgaXRlbVxuICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZz59XG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZScsXG4gIH0pXG4gIGdldChrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3JlcyBhIHZhbHVlXG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZScsXG4gIH0pXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBzaW5nbGUgc3RvcmVkIGl0ZW1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmc+fSByZXR1cm5zIGEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdpdGggdGhlIGtleSB0aGF0IHdhcyByZW1vdmVkXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZScsXG4gIH0pXG4gIHJlbW92ZShrZXk6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgcmVmZXJlbmNlcyBmcm9tIHRoZSBzdG9yYWdlLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmdbXT59IHJldHVybnMgYSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2l0aCBhcnJheSBvZiBrZXlzIHN0b3JhZ2VcbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2Uoe1xuICAgIGNhbGxiYWNrT3JkZXI6ICdyZXZlcnNlJyxcbiAgfSlcbiAga2V5cygpOiBQcm9taXNlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFyIGFsbCByZWZlcmVuY2VzIGZyb20gdGhlIHN0b3JhZ2UuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHtcbiAgICBjYWxsYmFja09yZGVyOiAncmV2ZXJzZScsXG4gIH0pXG4gIGNsZWFyKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEJyaW5ncyB1cCB0aGUgc2NyZWVuLWxvY2sgc2V0dGluZ3NcbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICBzZWN1cmVEZXZpY2UoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuLyoqXG4gKiBAbmFtZSBTZWN1cmUgU3RvcmFnZVxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIHBsdWdpbiBnZXRzLCBzZXRzIGFuZCByZW1vdmVzIGtleSx2YWx1ZSBwYWlycyBmcm9tIGEgZGV2aWNlJ3Mgc2VjdXJlIHN0b3JhZ2UuXG4gKlxuICogUmVxdWlyZXMgQ29yZG92YSBwbHVnaW46IGBjb3Jkb3ZhLXBsdWdpbi1zZWN1cmUtc3RvcmFnZWAuIEZvciBtb3JlIGluZm8sIHBsZWFzZSBzZWUgdGhlIFtDb3Jkb3ZhIFNlY3VyZSBTdG9yYWdlIGRvY3NdKGh0dHBzOi8vZ2l0aHViLmNvbS9DcnlwaG8vY29yZG92YS1wbHVnaW4tc2VjdXJlLXN0b3JhZ2UpLlxuICpcbiAqIFRoZSBicm93c2VyIHBsYXRmb3JtIGlzIHN1cHBvcnRlZCBhcyBhIG1vY2sgb25seS4gS2V5L3ZhbHVlcyBhcmUgc3RvcmVkIHVuZW5jcnlwdGVkIGluIGxvY2FsU3RvcmFnZS5cbiAqXG4gKiBAdXNhZ2VcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBTZWN1cmVTdG9yYWdlLCBTZWN1cmVTdG9yYWdlT2JqZWN0IH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9zZWN1cmUtc3RvcmFnZS9uZ3gnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VjdXJlU3RvcmFnZTogU2VjdXJlU3RvcmFnZSkgeyB9XG4gKlxuICogLi4uXG4gKlxuICogdGhpcy5zZWN1cmVTdG9yYWdlLmNyZWF0ZSgnbXlfc3RvcmVfbmFtZScpXG4gKiAgIC50aGVuKChzdG9yYWdlOiBTZWN1cmVTdG9yYWdlT2JqZWN0KSA9PiB7XG4gKlxuICogICAgICBzdG9yYWdlLmdldCgna2V5JylcbiAqICAgICAgICAudGhlbihcbiAqICAgICAgICAgIGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSksXG4gKiAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhlcnJvcilcbiAqICAgICAgKTtcbiAqXG4gKiAgICAgIHN0b3JhZ2Uuc2V0KCdrZXknLCAndmFsdWUnKVxuICogICAgICAgIC50aGVuKFxuICogICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICogICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXG4gKiAgICAgICk7XG4gKlxuICogICAgICBzdG9yYWdlLnJlbW92ZSgna2V5JylcbiAqICAgICAgLnRoZW4oXG4gKiAgICAgICAgICBkYXRhID0+IGNvbnNvbGUubG9nKGRhdGEpLFxuICogICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coZXJyb3IpXG4gKiAgICAgICk7XG4gKlxuICogICB9KTtcbiAqXG4gKlxuICogYGBgXG4gKiBAY2xhc3Nlc1xuICogU2VjdXJlU3RvcmFnZU9iamVjdFxuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ1NlY3VyZVN0b3JhZ2UnLFxuICBwbHVnaW46ICdjb3Jkb3ZhLXBsdWdpbi1zZWN1cmUtc3RvcmFnZS1lY2hvJyxcbiAgcGx1Z2luUmVmOiAnY29yZG92YS5wbHVnaW5zLlNlY3VyZVN0b3JhZ2UnLFxuICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL21pYnJpdG83MDcvY29yZG92YS1wbHVnaW4tc2VjdXJlLXN0b3JhZ2UtZWNobycsXG4gIHBsYXRmb3JtczogWydBbmRyb2lkJywgJ0Jyb3dzZXInLCAnaU9TJywgJ1dpbmRvd3MnXSxcbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VjdXJlU3RvcmFnZSBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuYW1lc3BhY2VkIHN0b3JhZ2UuXG4gICAqIEBwYXJhbSBzdG9yZSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxTZWN1cmVTdG9yYWdlT2JqZWN0Pn1cbiAgICovXG4gIEBDb3Jkb3ZhQ2hlY2soKVxuICBjcmVhdGUoc3RvcmU6IHN0cmluZyk6IFByb21pc2U8U2VjdXJlU3RvcmFnZU9iamVjdD4ge1xuICAgIHJldHVybiBnZXRQcm9taXNlPFNlY3VyZVN0b3JhZ2VPYmplY3Q+KChyZXM6IEZ1bmN0aW9uLCByZWo6IEZ1bmN0aW9uKSA9PiB7XG4gICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyAoU2VjdXJlU3RvcmFnZS5nZXRQbHVnaW4oKSkoXG4gICAgICAgICgpID0+IHJlcyhuZXcgU2VjdXJlU3RvcmFnZU9iamVjdChpbnN0YW5jZSkpLFxuICAgICAgICAoKSA9PiByZWoobmV3IFNlY3VyZVN0b3JhZ2VPYmplY3QoaW5zdGFuY2UpKSxcbiAgICAgICAgc3RvcmVcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
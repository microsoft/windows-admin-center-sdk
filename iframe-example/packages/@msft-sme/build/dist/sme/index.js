"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npm = require("../npm/npm");
var util = require("../util/util");
var sme_1 = require("./sme");
var SME = /** @class */ (function () {
    function SME() {
        // surface enums to gulp
        this.ProjectType = sme_1.ProjectType;
    }
    SME.prototype.init = function (isProd, projectType) {
        this.build = new sme_1.SMEBuild(isProd, projectType);
    };
    Object.defineProperty(SME.prototype, "isInitialized", {
        get: function () {
            return !!this.build;
        },
        enumerable: true,
        configurable: true
    });
    SME.prototype.validate = function (callback) {
        util.log("Starting sme.validate");
        var pkg = npm.readPackage();
        npm.validateDependencies(pkg, this.build.options.isProduction, callback);
    };
    SME.prototype.publish = function (confirm, callback, tags) {
        util.log("Starting sme.publish");
        util.log("confirm: " + confirm);
        util.log("tags: " + (tags ? tags.join(', ') : ''));
        this.build.publish(confirm, callback, tags);
    };
    SME.prototype.updateManifest = function (callback) {
        util.log("Starting sme.updateManifest");
        this.build.updateManifestForPublish(callback);
    };
    return SME;
}());
module.exports = new SME();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9zbWUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxnQ0FBbUM7QUFDbkMsbUNBQXNDO0FBR3RDLDZCQUE4QztBQUU5QztJQUFBO1FBQ0ksd0JBQXdCO1FBQ2pCLGdCQUFXLEdBQUcsaUJBQVcsQ0FBQztJQTZCckMsQ0FBQztJQXpCVSxrQkFBSSxHQUFYLFVBQVksTUFBZSxFQUFFLFdBQXdCO1FBQ2pELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxjQUFRLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxzQkFBVyw4QkFBYTthQUF4QjtZQUNJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixDQUFDOzs7T0FBQTtJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsUUFBK0I7UUFDM0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2xDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QixHQUFHLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0scUJBQU8sR0FBZCxVQUFlLE9BQWdCLEVBQUUsUUFBK0IsRUFBRSxJQUFlO1FBQzdFLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQVksT0FBUyxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFTLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFTSw0QkFBYyxHQUFyQixVQUFzQixRQUErQjtRQUNqRCxJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBQ0wsVUFBQztBQUFELENBL0JBLEFBK0JDLElBQUE7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMiLCJmaWxlIjoic21lL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsXSwic291cmNlUm9vdCI6IkM6XFxCQVxcNDE3XFxzIn0=

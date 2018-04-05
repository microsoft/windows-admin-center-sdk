'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require("child_process");
var gutil = require("gulp-util");
var util = require("../util/util");
var PLUGIN_NAME = 'gulp-sme-ng2';
function getArguments() {
    return process.argv.slice(2);
}
function spawnNgCommand(command, args, cb) {
    gutil.log('ng command', args);
    args.unshift(command);
    var cmd = child_process.spawn('ng.cmd', args);
    cmd.stdout.on('data', function (data) {
        gutil.log(data.toString());
    });
    cmd.stderr.on('data', function (data) {
        gutil.log(data.toString());
    });
    cmd.on('exit', function (code) {
        if (code > 0) {
            var message = util.format('"ng {0}" exited with code {1}.', args.join(' '), gutil.colors.cyan(code.toString()));
            cb(util.toGulpError(PLUGIN_NAME, message));
            return;
        }
        cb();
    });
}
function build(done) {
    spawnNgCommand('build', getArguments().concat('--aot=false'), done);
}
exports.build = build;
function buildAot(done) {
    spawnNgCommand('build', getArguments().concat('--aot=true'), done);
}
exports.buildAot = buildAot;
function serve(done) {
    spawnNgCommand('serve', getArguments(), done);
}
exports.serve = serve;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9uZzIvbmcyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYiw2Q0FBZ0Q7QUFDaEQsaUNBQW9DO0FBR3BDLG1DQUFzQztBQUV0QyxJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUM7QUFFbkM7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUVELHdCQUF3QixPQUFlLEVBQUUsSUFBYyxFQUFFLEVBQXlCO0lBQzlFLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDOUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtRQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtRQUNoQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1gsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEgsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUNELEVBQUUsRUFBRSxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsZUFBc0IsSUFBMkI7SUFDN0MsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEUsQ0FBQztBQUZELHNCQUVDO0FBRUQsa0JBQXlCLElBQTJCO0lBQ2hELGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFGRCw0QkFFQztBQUVELGVBQXNCLElBQTJCO0lBQzdDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUZELHNCQUVDIiwiZmlsZSI6Im5nMi9uZzIuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJzb3VyY2VSb290IjoiQzpcXEJBXFw0MTdcXHMifQ==

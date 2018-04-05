// node cannot read ES6 files so we use babel to transpile them
var babelCompileLibraries = [
    '/node_modules/@msft-sme/',
    '/node_modules/@angular/',
    '/dist/'
];
var startsWith = babelCompileLibraries.map(function (relativePath) { return (process.cwd().split('\\').join('/') + relativePath).toUpperCase(); });
require('babel-register')({
    ignore: function (filename) {
        filename = filename.toUpperCase();
        if (startsWith.find(function (startWith) { return filename.indexOf(startWith) === 0; })) {
            return false;
        }
        else {
            return true;
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QtdXRpbC9sb2FkLWJhYmVsLXJlcXVpcmUuaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLCtEQUErRDtBQUMvRCxJQUFJLHFCQUFxQixHQUFHO0lBQ3hCLDBCQUEwQjtJQUMxQix5QkFBeUI7SUFDekIsUUFBUTtDQUNYLENBQUM7QUFFRixJQUFJLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxZQUFZLElBQUssT0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFsRSxDQUFrRSxDQUFDLENBQUM7QUFFakksT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdEIsTUFBTSxFQUFFLFVBQVUsUUFBUTtRQUN0QixRQUFRLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBQyxTQUFTLElBQUssT0FBQSxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoibG9hZC1iYWJlbC1yZXF1aXJlLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9tYXR3aWxzL3NvdXJjZS9tc2Z0LXNtZS1pZnJhbWUtZXh0ZW5zaW9uL2lubGluZVNyYy8ifQ==
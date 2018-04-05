var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Observable } from 'rxjs';
import { LogLevel } from '../diagnostics/log-level';
import { Logging } from '../diagnostics/logging';
import { EnvironmentModule, EnvironmentModuleToolState } from '../manifest/environment-modules';
import { GatewayMode } from '../shared/gateway-inventory/gateway-inventory';
/**
 * The class handles conditions of tools to be presented on tools' menu.
 */
var ToolConditionValidator = /** @class */ (function () {
    /**
     * Initializes a new instance of the ToolConditionValidator class.
     * @param caches the instance of the inventory query caches to share the resource.
     */
    function ToolConditionValidator(caches) {
        this.caches = caches;
    }
    /**
     * Gets the current object of the ToolConditionValidator class, and maintains as singleton.
     *
     * @param caches the instance of the inventory query caches to share the resource.
     */
    ToolConditionValidator.current = function (caches) {
        if (!ToolConditionValidator.internalCurrent) {
            ToolConditionValidator.internalCurrent = new ToolConditionValidator(caches);
        }
        return ToolConditionValidator.internalCurrent;
    };
    /**
     * Scan the tool condition to be present or not.
     * @param connection the connection object.
     * @param solution The entry point object of solution.
     * @param tool The entry point object of tool.
     * @param scanMode The mode of scanning.
     * @return {Observable} the result observable.
     */
    ToolConditionValidator.prototype.scanToolCondition = function (connection, solution, tool) {
        var _this = this;
        if (!tool.requirements) {
            // tool is missing requirements, never show.
            return __assign({}, tool, {
                show: false,
                detail: EnvironmentModuleToolState.NotSupported
            });
        }
        var solutionId = EnvironmentModule.createFormattedEntrypoint(solution);
        var toolId = EnvironmentModule.createFormattedEntrypoint(tool);
        var checkersCollection = [];
        for (var _i = 0, _a = tool.requirements; _i < _a.length; _i++) {
            var requirement = _a[_i];
            if (requirement.solutionIds
                && requirement.connectionTypes
                && requirement.solutionIds.some(function (id) { return id === solutionId; })
                && requirement.connectionTypes.some(function (type) { return type === connection.type; })) {
                if (!requirement.conditions || requirement.conditions.length === 0) {
                    return __assign({}, tool, {
                        show: true,
                        detail: EnvironmentModuleToolState.Available
                    });
                }
                var checkers = [];
                for (var _b = 0, _c = requirement.conditions; _b < _c.length; _b++) {
                    var condition = _c[_b];
                    if (condition.localhost !== undefined && !condition.localhost) {
                        // if connection is localhost and not supported.
                        checkers.push(this.localhostValidate(connection));
                    }
                    if (condition.inventory) {
                        checkers.push(this.inventoryValidate(connection, condition.inventory));
                    }
                    if (condition.script) {
                        checkers.push(this.toolInventoryValidate(connection, toolId, condition.script));
                    }
                }
                if (checkers.length === 0) {
                    return __assign({}, tool, {
                        show: true,
                        detail: EnvironmentModuleToolState.Available
                    });
                }
                checkersCollection.push(checkers);
            }
        }
        if (checkersCollection.length === 0) {
            return __assign({}, tool, {
                show: false,
                detail: EnvironmentModuleToolState.NotSupported
            });
        }
        var collectionIndex = 0;
        var checkerIndex = 0;
        var lastDetail = null;
        var lastMessage = null;
        return this.runChecker(checkersCollection[collectionIndex][checkerIndex])
            .catch(function (error, caught) {
            Logging.log({
                level: LogLevel.Error,
                message: MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationResult.message.format(tool.parentModule.name, tool.displayName),
                source: 'ToolConditionValidator'
            });
            return Observable.of({
                show: false,
                ends: true
            });
        })
            .expand(function (value, index) {
            checkerIndex++;
            if (value.ends) {
                return Observable.empty();
            }
            if (value.detail !== undefined && lastDetail == null) {
                lastDetail = value.detail;
            }
            if (value.message !== undefined && lastMessage == null) {
                lastMessage = value.message;
            }
            if (!value.show) {
                // failed result. increment collection index and reset checkerIndex.
                if (checkersCollection.length > ++collectionIndex) {
                    // still has another condition, try next checker set.
                    return _this.runChecker(checkersCollection[collectionIndex][checkerIndex = 0]);
                }
                else {
                    // no more condition, end to return 'false'.
                    return Observable.of({
                        show: false,
                        detail: lastDetail,
                        message: lastMessage,
                        ends: true
                    });
                }
            }
            if (checkersCollection[collectionIndex].length > checkerIndex) {
                // check next checker.
                return _this.runChecker(checkersCollection[collectionIndex][checkerIndex]);
            }
            else {
                // all state/succeeded within the checker set.
                return Observable.of({
                    show: true,
                    detail: lastDetail,
                    message: lastMessage,
                    ends: true
                });
            }
        })
            .filter(function (combined) { return combined.ends; })
            .map(function (combined) {
            return __assign({}, tool, {
                show: combined.show,
                detail: combined.detail,
                message: combined.message
            });
        });
    };
    ToolConditionValidator.prototype.runChecker = function (checker) {
        return checker.take(1).map(function (result) { return (__assign({}, result, { ends: false })); });
    };
    ToolConditionValidator.prototype.localhostValidate = function (connection) {
        return this.caches.gatewayCache.createObservable({})
            .map(function (instance) { return ({
            show: !(instance.mode !== GatewayMode.Service
                && connection.properties
                && connection.properties.displayName === 'localhost')
        }); });
    };
    ToolConditionValidator.prototype.inventoryValidate = function (connection, condition) {
        var _this = this;
        return this.caches.serverCache.createObservable({ params: { name: connection.name } })
            .filter(function (instance) { return instance.serverName === connection.name; })
            .map(function (instance) { return ({
            show: _this.checkServerInventoryCondition(condition, instance)
        }); });
    };
    ToolConditionValidator.prototype.toolInventoryValidate = function (connection, id, script) {
        return this.caches.toolInventoryCache.query({ name: connection.name, id: id, script: script })
            .map(function (inventory) { return ({
            show: inventory.instance.state === EnvironmentModuleToolState.Available
                || inventory.instance.state === EnvironmentModuleToolState.NotConfigured,
            detail: inventory.instance.state,
            message: inventory.instance.message
        }); });
    };
    ToolConditionValidator.prototype.checkServerInventoryCondition = function (condition, instance) {
        for (var _i = 0, _a = ToolConditionValidator.serverInventoryProperties; _i < _a.length; _i++) {
            var property = _a[_i];
            var conditionItem = condition[property.conditionName];
            if (conditionItem && !this.checkCondition(instance[property.dataName], conditionItem)) {
                return false;
            }
        }
        return true;
    };
    ToolConditionValidator.prototype.checkCondition = function (data, condition) {
        switch (condition.type) {
            case 'number':
                var numberValue = this.getNumberOrZero(data);
                var numberTest = this.getNumberOrZero(condition.value);
                switch (condition.operator) {
                    case ToolConditionValidator.operators.gt:
                        return numberValue > numberTest;
                    case ToolConditionValidator.operators.ge:
                        return numberValue >= numberTest;
                    case ToolConditionValidator.operators.lt:
                        return numberValue < numberTest;
                    case ToolConditionValidator.operators.le:
                        return numberValue <= numberTest;
                    case ToolConditionValidator.operators.eq:
                        return numberValue === numberTest;
                    case ToolConditionValidator.operators.ne:
                        return numberValue !== numberTest;
                    case ToolConditionValidator.operators.is:
                        return !!numberValue;
                    case ToolConditionValidator.operators.not:
                        return !numberValue;
                    default:
                        throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationUnsupportedOperator.message);
                }
            case 'string':
                var stringValue = '' + data;
                var stringTest = '' + condition.value;
                switch (condition.operator) {
                    case ToolConditionValidator.operators.gt:
                        return stringValue.toLowerCase() > stringTest.toLowerCase();
                    case ToolConditionValidator.operators.ge:
                        return stringValue.toLowerCase() >= stringTest.toLowerCase();
                    case ToolConditionValidator.operators.lt:
                        return stringValue.toLowerCase() < stringTest.toLowerCase();
                    case ToolConditionValidator.operators.le:
                        return stringValue.toLowerCase() <= stringTest.toLowerCase();
                    case ToolConditionValidator.operators.eq:
                        return stringValue.toLowerCase() === stringTest.toLowerCase();
                    case ToolConditionValidator.operators.ne:
                        return stringValue.toLowerCase() !== stringTest.toLowerCase();
                    case ToolConditionValidator.operators.is:
                        return !!data;
                    case ToolConditionValidator.operators.not:
                        return !data;
                    case ToolConditionValidator.operators.contains:
                        return stringValue.toLowerCase().indexOf(stringTest.toLowerCase()) >= 0;
                    case ToolConditionValidator.operators.notContains:
                        return stringValue.toLowerCase().indexOf(stringTest.toLowerCase()) < 0;
                    default:
                        throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationUnsupportedOperator.message);
                }
            case 'boolean':
                switch (condition.operator) {
                    case ToolConditionValidator.operators.is:
                        return !!data;
                    case ToolConditionValidator.operators.not:
                        return !data;
                    default:
                        throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationUnsupportedOperator.message);
                }
            case 'version':
                var versionValue = data;
                var versionTest = condition.value;
                return this.compareVersion(versionValue, versionTest, condition.operator);
            default:
                throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationUnsupportedDataType.message);
        }
    };
    ToolConditionValidator.prototype.compareVersion = function (left, right, operator) {
        var leftSegments = left.split('.');
        var rightSegments = right.split('.');
        if (!leftSegments || leftSegments.length <= 0 || !rightSegments || rightSegments.length <= 0) {
            throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationVersionFormat.message);
        }
        var count = Math.max(leftSegments.length, rightSegments.length);
        var status;
        for (var index = 0; index < count; index++) {
            if (rightSegments[index] === '*') {
                // quit comparison with wildcard.
                status = 0;
                break;
            }
            var leftSegment = this.getNumberOrZero(leftSegments[index]);
            var rightSegment = this.getNumberOrZero(rightSegments[index]);
            if (leftSegment === rightSegment) {
                // equal.
                status = 0;
            }
            else if (leftSegment > rightSegment) {
                // greater.
                status = 1;
                break;
            }
            else {
                // lesser.
                status = -1;
                break;
            }
        }
        switch (operator) {
            case ToolConditionValidator.operators.gt:
                return status > 0;
            case ToolConditionValidator.operators.ge:
                return status >= 0;
            case ToolConditionValidator.operators.lt:
                return status < 0;
            case ToolConditionValidator.operators.le:
                return status <= 0;
            case ToolConditionValidator.operators.eq:
                return status === 0;
            case ToolConditionValidator.operators.ne:
                return status !== 0;
            default:
                throw new Error(MsftSme.resourcesStrings().MsftSmeShell.Core.Error.ToolValidationUnsupportedOperator.message);
        }
    };
    ToolConditionValidator.prototype.getNumberOrZero = function (data) {
        var result = Number(data);
        return isNaN(result) ? 0 : result;
    };
    /**
     * Support the following condition name.
     * It can be a string, number, boolean and version string.
     */
    ToolConditionValidator.serverInventoryProperties = [
        // string
        {
            conditionName: 'computerManufacturer',
            dataName: 'computerManufacturer'
        },
        // number
        {
            conditionName: 'operatingSystemSKU',
            dataName: 'operatingSystemSKU'
        },
        // version string
        {
            conditionName: 'operatingSystemVersion',
            dataName: 'operatingSystemVersion'
        },
        // number
        {
            conditionName: 'windowsProductType',
            dataName: 'productType'
        },
        // string
        {
            conditionName: 'clusterFqdn',
            dataName: 'clusterFqdn'
        },
        // boolean
        {
            conditionName: 'isHyperVRoleInstalled',
            dataName: 'isHyperVRoleInstalled'
        },
        // boolean
        {
            conditionName: 'isHyperVPowershellInstalled',
            dataName: 'isHyperVPowershellInstalled'
        },
        // boolean
        {
            conditionName: 'isManagementToolsAvailable',
            dataName: 'isManagementToolsAvailable'
        },
        // boolean
        {
            conditionName: 'isWmfInstalled',
            dataName: 'isWmfInstalled'
        }
    ];
    /**
     * The following operators are supported.
     */
    ToolConditionValidator.operators = {
        gt: 'gt',
        ge: 'ge',
        lt: 'lt',
        le: 'le',
        eq: 'eq',
        ne: 'ne',
        is: 'is',
        not: 'not',
        contains: 'contains',
        notContains: 'notContains'
    };
    return ToolConditionValidator;
}());
export { ToolConditionValidator };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2VjdXJpdHkvdG9vbC1jb25kaXRpb24tdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUdsQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pELE9BQU8sRUFDSCxpQkFBaUIsRUFNakIsMEJBQTBCLEVBQzdCLE1BQU0saUNBQWlDLENBQUM7QUFFekMsT0FBTyxFQUFvQixXQUFXLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQWU5Rjs7R0FFRztBQUNIO0lBK0ZJOzs7T0FHRztJQUNILGdDQUFZLE1BQTRCO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFuQkQ7Ozs7T0FJRztJQUNXLDhCQUFPLEdBQXJCLFVBQXNCLE1BQTRCO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsc0JBQXNCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQyxzQkFBc0IsQ0FBQyxlQUFlLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRixDQUFDO1FBRUQsTUFBTSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQztJQUNsRCxDQUFDO0lBVUQ7Ozs7Ozs7T0FPRztJQUNJLGtEQUFpQixHQUF4QixVQUNRLFVBQXNCLEVBQ3RCLFFBQXFDLEVBQ3JDLElBQWlDO1FBSHpDLGlCQWtKQztRQTdJRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLDRDQUE0QztZQUM1QyxNQUFNLGNBQ0MsSUFBSSxFQUNrQztnQkFDckMsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsTUFBTSxFQUFFLDBCQUEwQixDQUFDLFlBQVk7YUFDbEQsRUFDSDtRQUNOLENBQUM7UUFF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QUFRLEVBQUUsd0JBQXdCO1NBQ3JDO1FBRUQsU0FBUztRQUNUO1lBQ0ksYUFBYSxFQUFFLG9CQUFvQjtZQUNuQyxRQUFRLEVBQUUsYUFBYTtTQUMxQjtRQUVELFNBQVM7UUFDVDtZQUNJLGFBQWEsRUFBRSxhQUFhO1lBQzVCLFFBQVEsRUFBRSxhQUFhO1NBQzFCO1FBRUQsVUFBVTtRQUNWO1lBQ0ksYUFBYSxFQUFFLHVCQUF1QjtZQUN0QyxRQUFRLEVBQUUsdUJBQXVCO1NBQ3BDO1FBRUQsVUFBVTtRQUNWO1lBQ0ksYUFBYSxFQUFFLDZCQUE2QjtZQUM1QyxRQUFRLEVBQUUsNkJBQTZCO1NBQzFDO1FBRUQsVUFBVTtRQUNWO1lBQ0ksYUFBYSxFQUFFLDRCQUE0QjtZQUMzQyxRQUFRLEVBQUUsNEJBQTRCO1NBQ3pDO1FBRUQsVUFBVTtRQUNWO1lBQ0ksYUFBYSxFQUFFLGdCQUFnQjtZQUMvQixRQUFRLEVBQUUsZ0JBQWdCO1NBQzdCO0tBQ0osQ0FBQztJQUVGOztPQUVHO0lBQ1ksZ0NBQVMsR0FBRztRQUN2QixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsSUFBSTtRQUNSLEdBQUcsRUFBRSxLQUFLO1FBQ1YsUUFBUSxFQUFFLFVBQVU7UUFDcEIsV0FBVyxFQUFFLGFBQWE7S0FDN0IsQ0FBQztJQXlXTiw2QkFBQztDQXBiRCxBQW9iQyxJQUFBO1NBcGJZLHNCQUFzQiIsImZpbGUiOiJ0b29sLWNvbmRpdGlvbi12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9
import { Observable } from 'rxjs';
import { EnvironmentModuleEntryPoint, EnvironmentModuleEntryPointWithToolConditionResult } from '../manifest/environment-modules';
import { Connection } from '../security/connection';
import { InventoryQueryCaches } from '../shared/inventory-query-caches';
/**
 * The class handles conditions of tools to be presented on tools' menu.
 */
export declare class ToolConditionValidator {
    /**
     * Support the following condition name.
     * It can be a string, number, boolean and version string.
     */
    private static serverInventoryProperties;
    /**
     * The following operators are supported.
     */
    private static operators;
    private static internalCurrent;
    private caches;
    private toolInventoryCache;
    /**
     * Gets the current object of the ToolConditionValidator class, and maintains as singleton.
     *
     * @param caches the instance of the inventory query caches to share the resource.
     */
    static current(caches: InventoryQueryCaches): ToolConditionValidator;
    /**
     * Initializes a new instance of the ToolConditionValidator class.
     * @param caches the instance of the inventory query caches to share the resource.
     */
    constructor(caches: InventoryQueryCaches);
    /**
     * Scan the tool condition to be present or not.
     * @param connection the connection object.
     * @param solution The entry point object of solution.
     * @param tool The entry point object of tool.
     * @param scanMode The mode of scanning.
     * @return {Observable} the result observable.
     */
    scanToolCondition(connection: Connection, solution: EnvironmentModuleEntryPoint, tool: EnvironmentModuleEntryPoint): Observable<EnvironmentModuleEntryPointWithToolConditionResult> | EnvironmentModuleEntryPointWithToolConditionResult;
    private runChecker(checker);
    private localhostValidate(connection);
    private inventoryValidate(connection, condition);
    private toolInventoryValidate(connection, id, script);
    private checkServerInventoryCondition(condition, instance);
    private checkCondition(data, condition);
    private compareVersion(left, right, operator);
    private getNumberOrZero(data);
}

/**
 * The mode that the gateway is running as.
 */
export var GatewayMode;
(function (GatewayMode) {
    /**
     * Indicates the Gateway is running as a service
     */
    GatewayMode[GatewayMode["Service"] = 0] = "Service";
    /**
     * Indicates the Gateway is running as a desktop application
     */
    GatewayMode[GatewayMode["Desktop"] = 1] = "Desktop";
    /**
     * Indicates the Gateway is running as a UWP application
     */
    GatewayMode[GatewayMode["App"] = 2] = "App";
})(GatewayMode || (GatewayMode = {}));
/**
 * Gateway Inventory class.
 */
var GatewayInventory = /** @class */ (function () {
    /**
     * Initializes a new instance of the GatewayInventory Class.
     *
     * @param data the server inventory recovered data.
     */
    function GatewayInventory(data) {
        if (data) {
            Object.assign(this, data);
        }
    }
    return GatewayInventory;
}());
export { GatewayInventory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUvc2hhcmVkL2dhdGV3YXktaW52ZW50b3J5L2dhdGV3YXktaW52ZW50b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBOztHQUVHO0FBQ0gsTUFBTSxDQUFOLElBQVksV0FlWDtBQWZELFdBQVksV0FBVztJQUNuQjs7T0FFRztJQUNILG1EQUFPLENBQUE7SUFFUDs7T0FFRztJQUNILG1EQUFPLENBQUE7SUFFUDs7T0FFRztJQUNILDJDQUFHLENBQUE7QUFDUCxDQUFDLEVBZlcsV0FBVyxLQUFYLFdBQVcsUUFldEI7QUFvRUQ7O0dBRUc7QUFDSDtJQThESTs7OztPQUlHO0lBQ0gsMEJBQVksSUFBMkI7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBQ0wsdUJBQUM7QUFBRCxDQXhFQSxBQXdFQyxJQUFBIiwiZmlsZSI6ImdhdGV3YXktaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzQ0NC9zL2lubGluZVNyYy8ifQ==
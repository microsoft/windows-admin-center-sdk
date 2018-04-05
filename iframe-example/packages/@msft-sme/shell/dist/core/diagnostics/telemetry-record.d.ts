/**
 * Telemetry record.
 */
export interface TelemetryRecord {
    /**
     * The view name.
     * ex) createVmForm, processList, eventRecordList, stopServiceConfirmationDialog...
     */
    view: string;
    /**
     * The instance name for the telemerty target object.
     */
    instance: string;
    /**
     * The name of part within the view.
     * ex) angular component name.
     */
    part?: string;
    /**
     * The action name.
     * ex) createVm, refresh, stopService
     */
    action: string;
    /**
     * A modifier for the action.
     */
    actionModifier?: string;
    /**
     * The additional data.
     */
    data?: any;
    /**
     * Whether or not this event should be considered optional. Default to false.
     */
    optional?: boolean;
}

/**
 * The levels of severity that are able to be portrayed by an page alert.
 */
export declare enum HealthAlertSeverity {
    Critical = 0,
    Major = 1,
    Minor = 2,
    Cosmetic = 3,
    Unknown = 4,
}
/**
 * The Page Alert.
 */
export interface PageAlert {
    severity: HealthAlertSeverity;
    message: string;
    detailsCaption?: string;
    detailsLabel?: string;
    detailsCommand?(event: any): void;
}

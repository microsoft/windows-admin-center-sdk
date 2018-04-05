export declare enum GeographicLocation {
    Here = 0,
    There = 1,
    FarAway = 2,
}
export interface SimpleFormData {
    name: string;
    location: GeographicLocation;
    value: number;
    fileName: string;
}

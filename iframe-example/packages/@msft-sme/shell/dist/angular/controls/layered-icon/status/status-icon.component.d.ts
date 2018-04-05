export declare type StatusIcon = 'info' | 'warning' | 'error' | 'success';
export declare class StatusIconComponent {
    /**
     * Input binding for the size of the icon in pixels
     */
    size: number | string;
    /**
     * Input binding for the status icon type
     */
    status: StatusIcon;
    /**
     *
     */
    layers: any[];
}

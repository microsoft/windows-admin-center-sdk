/**
 * The Breadcrumb item structure.
 */
export interface BreadcrumbItem {
    label: string;
    clickable: boolean;
    bold?: boolean;
    command?(event: any): void;
}

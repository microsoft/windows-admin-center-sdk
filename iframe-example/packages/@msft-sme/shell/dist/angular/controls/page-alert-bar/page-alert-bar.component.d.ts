import { PageAlert } from './models';
export declare class PageAlertBarComponent {
    static readonly errorThemes: {
        criticalTheme: string;
        majorTheme: string;
        minorTheme: string;
        cosmeticTheme: string;
    };
    static readonly errorIcons: {
        criticalIcon: string;
        errorIcon: string;
        warningIcon: string;
        infoIcon: string;
    };
    private strings;
    defaultDetailsLabel: string;
    /**
     * page alert to display.
     */
    alert: PageAlert;
    /**
     * Gets the theme CSS classes for a given alert.
     *
     */
    getAlertThemeClass(): string[];
    /**
     * Gets the icon CSS classes for a given alert.
     *
     */
    getAlertIconClass(): string[];
}

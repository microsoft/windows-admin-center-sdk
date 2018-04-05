import { Router } from '@angular/router';
export declare class AppModule {
    private router;
    private navigateByUrlOriginal;
    /**
     * Initializes a new instance of the AppModule class.
     * @param router the router object.
     */
    constructor(router: Router);
    private navigateByUrlOverride(url, extras?);
}

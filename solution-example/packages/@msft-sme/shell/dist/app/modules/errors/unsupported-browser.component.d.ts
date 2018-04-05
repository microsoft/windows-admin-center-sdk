import { ActivatedRouteSnapshot } from '@angular/router';
import { AppContextService } from '../../../angular';
export declare class UnsupportedBrowserComponent {
    private appContextService;
    strings: {
        Overview: {
            title: string;
            gatewayStatus: {
                header: string;
                versionHeader: string;
                lastUpdatedHeader: string;
                buildNumberHeader: string;
                updateAvailable: string;
                smeUpdate: string;
                smeUpdateUri: string;
                error: string;
            };
            feedback: {
                header: string;
                link: {
                    text: string;
                    href: string;
                };
            };
        };
        Connections: {
            title: string;
            nodeNameHeader: string;
            nodeTypeHeader: string;
            nodeStatusHeader: string;
            nodeOsHeader: string;
            nodeManagingAsHeader: string;
            nodeLastUpdatedHeader: string;
            connectionTypeHeader: string;
            actions: {
                add: string;
                remove: string;
                connect: string;
                manageAs: string;
                manageAsLaps: string;
                refreshServer: string;
                search: {
                    placeholder: string;
                };
            };
            empty: {
                loading: string;
                none: string;
            };
            nodeOs: {
                Nano: string;
                Server2016: string;
                Server2012: string;
                cluster: string;
            };
            gettingStarted: {
                title: {
                    format: string;
                };
            };
            serverStatus: {
                refreshing: string;
                loading: string;
                unreachable: string;
                ready: string;
                unauthorized: string;
                unknown: string;
                untrusted: string;
                unsupported: string;
                wmiProvidersNotInstalled: string;
                wmfNotPresent: string;
                prerequisitesNotMet: string;
            };
            listStatus: {
                message: string;
            };
            dialogs: {
                remove: {
                    title: string;
                    messageFormat: string;
                    multiMessageFormat: string;
                    cancelButtonText: string;
                    confirmButtonText: string;
                    error: {
                        titleFormat: string;
                    };
                };
                elevate: {
                    confirmButtonText: string;
                    cancelButtonText: string;
                    elevateGatewayTitle: string;
                    elevateGatewayMessage: string;
                };
                add: {
                    title: string;
                    typeTitleFormat: string;
                    sideLoadWarning: string;
                    buttons: {
                        cancel: string;
                    };
                };
            };
            Dialogs: {
                Buttons: {
                    Close: {
                        label: string;
                    };
                };
            };
            User: {
                Error: {
                    title: string;
                };
            };
        };
        Shell: {
            applicationTitle: string;
            applicationTitleSuffix: string;
            applicationVersion: string;
            welcomeMessage: string;
            settings: string;
            nodeLabel: string;
            userLabel: string;
            changeConnection: string;
            getUserProfileError: string;
        };
        Errors: {
            UnsupportedBrowser: {
                title: string;
            };
            UnsupportedBrowserCommon: {
                message: string;
            };
            UnsupportedBrowserFootBegin: {
                message: string;
            };
            UnsupportedBrowserBody: {
                message: string;
            };
            UnsupportedBrowserFootEnd: {
                message: string;
            };
        };
        Sidebar: {
            menuTitle: string;
            homeTitle: string;
            connectionsTitle: string;
            generalTitle: string;
            sideLoadWarning: string;
            connectionOverviewTitle: string;
            toolsTitle: string;
            expand: string;
            collapse: string;
            searchPlaceholder: string;
        };
        SolutionsList: {
            installedSolutions: string;
            sideLoadWarning: string;
            getMore: string;
        };
        SolutionConnections: {
            connections: {
                title: {
                    format: string;
                };
            };
        };
        IFrame: {
            Reload: {
                label: string;
            };
            Cancel: {
                label: string;
            };
            FailedLoad: {
                title: string;
                message: string;
            };
            ErrorDescription: {
                title: string;
            };
            LoadTime: {
                message: string;
            };
            LoadingCanceled: {
                message: string;
            };
            TakingLonger: {
                message: string;
            };
            TakingLongerCancelling: {
                message: string;
            };
        };
        AboutDialog: {
            Disclosure: {
                text: string;
            };
            EULA: {
                text: string;
            };
            Privacy: {
                text: string;
            };
            Version: {
                label: string;
            };
        };
        ManageAsDialog: {
            messageFormat: string;
            messageCountFormat: string;
            title: string;
            validatingMessage: string;
            authError: string;
        };
        NotificationsDialog: {
            clearAll: string;
            goTo: string;
            title: string;
        };
        SettingsDialog: {
            title: string;
            language: string;
            manageExtensions: string;
        };
        DayZeroDialog: {
            Next: string;
            Back: string;
            Finish: string;
            SkipTour: string;
            Page1: {
                Title: string;
                Subtext: string;
            };
            Page2: {
                Title: string;
                Subtext: string;
            };
        };
    };
    /**
     * Update the navigation title.
     *
     * @param appContextService the application context service.
     * @param snapshot the route snapshot.
     */
    static navigationTitle(appContextService: AppContextService, snapshot: ActivatedRouteSnapshot): string;
    constructor(appContextService: AppContextService);
    readonly bodyMessage: string;
}

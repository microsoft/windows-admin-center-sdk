import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppContextService } from '../../../angular';
import { EnvironmentModuleEntryPoint } from '../../../core';
export declare class ConnectionsComponent implements OnInit, OnDestroy {
    private appContext;
    private route;
    private router;
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
            nodeTagsHeader: string;
            nodeLastConnectedHeader: string;
            connectionTypeHeader: string;
            neverConnectedText: string;
            actions: {
                add: string;
                remove: string;
                editTags: string;
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
                connecting: string;
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
                    tags: {
                        label: string;
                    };
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
            applicationTitleAppModeSuffix: string;
            welcomeMessage: string;
            settings: string;
            nodeLabel: string;
            userLabel: string;
            changeConnection: string;
            getUserProfileError: string;
        };
        AppBar: {
            Buttons: {
                Notifications: {
                    title: string;
                    desc: {
                        format: string;
                    };
                };
                Settings: {
                    title: string;
                };
                Help: {
                    title: string;
                };
            };
            Logo: {
                title: string;
            };
            Nav: {
                Landmark: {
                    Primary: {
                        aria: {
                            label: string;
                        };
                    };
                };
            };
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
            UserProfile: {
                Get: {
                    formatMessage: string;
                };
                Put: {
                    formatMessage: string;
                };
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
            Nav: {
                Landmark: {
                    Secondary: {
                        aria: {
                            label: string;
                        };
                    };
                };
            };
        };
        SolutionsList: {
            installedSolutions: string;
            sideLoadWarning: string;
            getMore: string;
            settings: string;
        };
        SolutionConnections: {
            connections: {
                title: {
                    format: string;
                };
                sidebar: {
                    landmark: {
                        aria: {
                            label: string;
                        };
                    };
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
        EditTagsDialog: {
            title: string;
            AddTags: {
                label: string;
            };
            RemoveTags: {
                label: string;
            };
        };
        NotificationsDialog: {
            clearAll: string;
            goTo: string;
            title: string;
            Details: {
                AriaTitle: string;
            };
            IndeterminateProgress: {
                AriaValueText: string;
                AriaLabel: string;
            };
            DeterminateProgress: {
                AriaLabel: string;
            };
        };
        SettingsDialog: {
            title: string;
            language: string;
            general: string;
            manageExtensions: string;
            extensions: string;
            connection: string;
            port: string;
            certificateThumbprint: string;
            access: {
                search: string;
                description: string;
                gatewayUsers: string;
                gatewayAdmins: string;
                addSecurityGroupHeader: string;
                addSecurityGroupMessage: string;
                securityGroupName: string;
                securityGroupType: string;
                securityGroup: string;
                smartCardSecurityGroup: string;
                machineSecurityGroup: string;
                save: string;
                cancel: string;
                close: string;
                toolTitle: string;
                users: string;
                admins: string;
                NameTitle: string;
                typeTitle: string;
                addedGroup: string;
                removedGroup: string;
                add: string;
                delete: string;
                deleteConfirmation: string;
                yes: string;
                no: string;
                nameTitle: string;
            };
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
    solution: EnvironmentModuleEntryPoint;
    header: string;
    private subscription;
    constructor(appContext: AppContextService, route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private updateSolution();
}

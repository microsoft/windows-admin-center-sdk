export const msftSmeRoutingConstants = {
    root: {
        title: 'MsftSme'
    },
    overview: {
        path: 'overview',
        title: 'Overview',
        loadChildren: './overview/overview.module#MsftSmeOverviewModule'
    },
    experiments: {
        path: 'experiments',
        title: 'Experiments',
        loadChildren: './experiments/experiments.module#MsftSmeExperimentsModule'
    }
};

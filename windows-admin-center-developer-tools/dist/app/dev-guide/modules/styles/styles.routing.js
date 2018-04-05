import { RouterModule } from '@angular/router';
import { StylesComponent } from './styles.component';
import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';
import { LayersComponent } from './layers/layers.component';
import { LayoutComponent } from './layout/layout.component';
import { LinksComponent } from './links/links.component';
import { SchemesComponent } from './schemes/schemes.component';
import { ShadowsComponent } from './shadows/shadows.component';
import { SpacingComponent } from './spacing/spacing.component';
import { ThemesComponent } from './themes/themes.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { BehaviorsComponent } from './behaviors/behaviors.component';
import { PivotComponent } from './pivot/pivot.component';
import { ProgressComponent } from './progress/progress.component';
import { TypographyComponent } from './typography/typography.component';
export var routing = RouterModule.forChild([
    {
        path: '',
        component: StylesComponent,
        children: [
            { path: '', redirectTo: 'accessibility', pathMatch: 'full' },
            { path: 'accessibility', component: AccessibilityComponent },
            { path: 'behaviors', component: BehaviorsComponent },
            { path: 'colors', component: ColorsComponent },
            { path: 'icons', component: IconsComponent },
            { path: 'forms', loadChildren: 'app/dev-guide/modules/styles/form/form-styles.module#FormStylesModule' },
            { path: 'layers', component: LayersComponent },
            { path: 'layout', component: LayoutComponent },
            { path: 'links', component: LinksComponent },
            { path: 'pivot', component: PivotComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'schemes', component: SchemesComponent },
            { path: 'shadows', component: ShadowsComponent },
            { path: 'spacing', component: SpacingComponent },
            { path: 'themes', component: ThemesComponent },
            { path: 'typography', component: TypographyComponent }
        ]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSS9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUU1RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEUsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUF3QixZQUFZLENBQUMsUUFBUSxDQUM3RDtJQUNJO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsZUFBZTtRQUMxQixRQUFRLEVBQUU7WUFDTixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQzVELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsc0JBQXNCLEVBQUU7WUFDNUQsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRTtZQUNwRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRTtZQUM5QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRTtZQUM1QyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLHVFQUF1RSxFQUFFO1lBQ3hHLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO1lBQzlDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFO1lBQzlDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFO1lBQzVDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFO1lBQzVDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUU7WUFDbEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRTtZQUNoRCxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFO1lBQ2hELEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUU7WUFDaEQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUU7WUFDOUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRTtTQUN6RDtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InN0eWxlcy5yb3V0aW5nLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL21hdHdpbHMvU291cmNlL2Jhc2UvbXNmdC1zbWUtZGV2ZWxvcGVyLXRvb2xzL2lubGluZVNyYy8ifQ==
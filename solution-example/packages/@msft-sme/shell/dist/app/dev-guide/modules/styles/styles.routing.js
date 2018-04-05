import { RouterModule } from '@angular/router';
import { DetailsPaneContainerComponent } from './details-pane-container/details-pane-container.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { PrimeNGComponent } from './prime-ng/prime-ng.component';
import { StylesComponent } from './styles.component';
import { FormsComponent } from './forms/forms.component';
import { SimpleFormComponent } from './forms/simple-form.component';
export var routing = RouterModule.forChild([
    {
        path: '',
        component: StylesComponent,
        children: [
            { path: '', redirectTo: 'detailsPanel', pathMatch: 'full' },
            { path: 'detailsPanel', component: DetailsPanelComponent },
            { path: 'detailsPaneContainer', component: DetailsPaneContainerComponent },
            { path: 'primeng', component: PrimeNGComponent },
            {
                path: 'forms',
                component: FormsComponent,
                children: [
                    {
                        path: 'simpleForm',
                        component: SimpleFormComponent
                    }
                ]
            }
        ]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9zdHlsZXMvc3R5bGVzLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBSS9DLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLDJEQUEyRCxDQUFDO0FBQzFHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVyRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDekQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFcEUsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUF3QixZQUFZLENBQUMsUUFBUSxDQUM3RDtJQUNJO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsZUFBZTtRQUMxQixRQUFRLEVBQUU7WUFDTixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO1lBQzNELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUscUJBQXFCLEVBQUU7WUFDMUQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsU0FBUyxFQUFFLDZCQUE2QixFQUFDO1lBQ3pFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUM7WUFDL0M7Z0JBQ0ksSUFBSSxFQUFFLE9BQU87Z0JBQ2IsU0FBUyxFQUFFLGNBQWM7Z0JBQ3pCLFFBQVEsRUFBRTtvQkFDTjt3QkFDSSxJQUFJLEVBQUUsWUFBWTt3QkFDbEIsU0FBUyxFQUFFLG1CQUFtQjtxQkFDakM7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoic3R5bGVzLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiQzovQkEvMTMxL3MvaW5saW5lU3JjLyJ9
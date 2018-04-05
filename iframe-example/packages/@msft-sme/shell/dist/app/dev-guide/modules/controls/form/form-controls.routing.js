import { RouterModule } from '@angular/router';
import { FormControlsComponent } from './form-controls.component';
import { TagsExampleComponent } from './inputs/tags/tags-example.component';
export var routing = RouterModule.forChild([
    {
        path: '',
        component: FormControlsComponent,
        children: [
            { path: '', redirectTo: 'inputs', pathMatch: 'full' },
            {
                path: 'inputs',
                children: [
                    { path: '', redirectTo: 'tags', pathMatch: 'full' },
                    { path: 'tags', component: TagsExampleComponent },
                    { path: '**', redirectTo: 'tags' }
                ]
            },
            { path: '**', redirectTo: 'inputs' }
        ]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL2Zvcm0tY29udHJvbHMucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFFNUUsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUF3QixZQUFZLENBQUMsUUFBUSxDQUM3RDtJQUNJO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUscUJBQXFCO1FBQ2hDLFFBQVEsRUFBRTtZQUNOLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDckQ7Z0JBQ0ksSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFO29CQUNOLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7b0JBQ25ELEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUU7b0JBRWpELEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO2lCQUNyQzthQUNKO1lBQ0QsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7U0FFdkM7S0FDSjtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJmb3JtLWNvbnRyb2xzLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiQzovQkEvNDQ0L3MvaW5saW5lU3JjLyJ9
import { RouterModule } from '@angular/router';
import { FormControlsComponent } from './form-controls.component';
import { FormFieldsExampleComponent } from './form-fields/form-fields-example.component';
import { SodaFactoryExampleComponent } from './soda-factory/soda-factory-example.component';
import { ValidationAlertExampleComponent } from './validation-alert/validation-alert-example.component';
export var routing = RouterModule.forChild([
    {
        path: '',
        component: FormControlsComponent,
        children: [
            { path: '', redirectTo: 'example', pathMatch: 'full' },
            { path: 'example', component: SodaFactoryExampleComponent },
            { path: 'fields', component: FormFieldsExampleComponent },
            { path: 'validation', component: ValidationAlertExampleComponent },
            { path: '**', redirectTo: 'fields' }
        ]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9jb250cm9scy9mb3JtL2Zvcm0tY29udHJvbHMucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFFbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDNUYsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFFeEcsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUF3QixZQUFZLENBQUMsUUFBUSxDQUM3RDtJQUNJO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUscUJBQXFCO1FBQ2hDLFFBQVEsRUFBRTtZQUNOLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDdEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSwyQkFBMkIsRUFBRTtZQUMzRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLDBCQUEwQixFQUFFO1lBQ3pELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsK0JBQStCLEVBQUU7WUFDbEUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUU7U0FFdkM7S0FDSjtDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJmb3JtLWNvbnRyb2xzLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9
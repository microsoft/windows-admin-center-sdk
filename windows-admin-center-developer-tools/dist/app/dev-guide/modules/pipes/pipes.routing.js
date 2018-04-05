import { RouterModule } from '@angular/router';
import { BooleanConverterExampleComponent } from './boolean-converter/boolean-converter-example.component';
import { ByteUnitConverterExampleComponent } from './byte-unit-converter/byte-unit-converter-example.component';
import { EnumConverterExampleComponent } from './enum-converter/enum-converter-example.component';
import { FormatExampleComponent } from './format/format-example.component';
import { HighlightExampleComponent } from './highlight/highlight-example.component';
import { PipesComponent } from './pipes.component';
import { YesNoConverterExampleComponent } from './yesno-converter/yesno-converter-example.component';
export var routing = RouterModule.forChild([
    {
        path: '',
        component: PipesComponent,
        children: [
            { path: '', redirectTo: 'boolean-converter', pathMatch: 'full' },
            { path: 'boolean-converter', component: BooleanConverterExampleComponent },
            { path: 'yesno-converter', component: YesNoConverterExampleComponent },
            { path: 'byte-unit-converter', component: ByteUnitConverterExampleComponent },
            { path: 'enum-converter', component: EnumConverterExampleComponent },
            { path: 'highlight', component: HighlightExampleComponent },
            { path: 'format', component: FormatExampleComponent }
        ]
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9kZXYtZ3VpZGUvbW9kdWxlcy9waXBlcy9waXBlcy5yb3V0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZ0NBQWdDLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUMzRyxPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSw2REFBNkQsQ0FBQztBQUNoSCxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUNsRyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0scURBQXFELENBQUM7QUFFckcsTUFBTSxDQUFDLElBQU0sT0FBTyxHQUF3QixZQUFZLENBQUMsUUFBUSxDQUM3RDtJQUNJO1FBQ0ksSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsY0FBYztRQUN6QixRQUFRLEVBQUU7WUFDTixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7WUFDaEUsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLGdDQUFnQyxFQUFFO1lBQzFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSw4QkFBOEIsRUFBRTtZQUN0RSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxTQUFTLEVBQUUsaUNBQWlDLEVBQUU7WUFDN0UsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLDZCQUE2QixFQUFFO1lBQ3BFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUseUJBQXlCLEVBQUU7WUFDM0QsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxzQkFBc0IsRUFBRTtTQUN4RDtLQUNKO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InBpcGVzLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9
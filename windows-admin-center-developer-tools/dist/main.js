import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CoreEnvironment } from '@msft-sme/shell/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
// initialize SME module environment with localization settings.
CoreEnvironment.initialize({
    name: 'msft.sme.developer-tools',
    isProduction: environment.production,
    shellOrigin: '*'
}, {
    resourcesPath: 'assets/strings'
})
    .then(function () { return platformBrowserDynamic().bootstrapModule(AppModule); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3pCLGNBQWMsRUFBRSxDQUFDO0FBQ3JCLENBQUM7QUFFRCxnRUFBZ0U7QUFDaEUsZUFBZSxDQUFDLFVBQVUsQ0FDdEI7SUFDSSxJQUFJLEVBQUUsMEJBQTBCO0lBQ2hDLFlBQVksRUFBRSxXQUFXLENBQUMsVUFBVTtJQUNwQyxXQUFXLEVBQUUsR0FBRztDQUNuQixFQUNEO0lBQ0ksYUFBYSxFQUFFLGdCQUFnQjtDQUNsQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbWF0d2lscy9Tb3VyY2UvYmFzZS9tc2Z0LXNtZS1kZXZlbG9wZXItdG9vbHMvaW5saW5lU3JjLyJ9
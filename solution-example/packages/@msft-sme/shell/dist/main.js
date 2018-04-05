import './polyfills.ts';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { AssetManager } from './app/asset-manager';
import { CoreEnvironment, EnvironmentModule } from './core';
import { environment } from './environments/environment';
if (environment.production) {
    enableProdMode();
}
// initialize SME module environment with localization settings.
CoreEnvironment.initialize({
    name: EnvironmentModule.nameOfShell,
    isProduction: environment.production
}, {
    resourcesPath: 'assets/strings'
})
    .then(function () {
    // initialize assets   
    AssetManager.initialize(environment.production);
    // bootstrap angular
    platformBrowserDynamic().bootstrapModule(AppModule);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZ0IsQ0FBQztBQUV4QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDbkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM1RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFekQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDekIsY0FBYyxFQUFFLENBQUM7QUFDckIsQ0FBQztBQUVELGdFQUFnRTtBQUNoRSxlQUFlLENBQUMsVUFBVSxDQUN0QjtJQUNJLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxXQUFXO0lBQ25DLFlBQVksRUFBRSxXQUFXLENBQUMsVUFBVTtDQUN2QyxFQUNEO0lBQ0ksYUFBYSxFQUFFLGdCQUFnQjtDQUNsQyxDQUFDO0tBQ0QsSUFBSSxDQUFDO0lBQ0YsdUJBQXVCO0lBQ3ZCLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWhELG9CQUFvQjtJQUNwQixzQkFBc0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6IkM6L0JBLzEzMS9zL2lubGluZVNyYy8ifQ==
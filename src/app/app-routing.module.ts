import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dash', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./views/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: 'stats', loadChildren: () => import('./views/stats/stats.module').then(m => m.StatsModule) },
  { path: 'recipes', loadChildren: () => import('./views/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'groceries', loadChildren: () => import('./views/groceries/groceries.module').then(m => m.GroceriesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { AddNewsComponent } from './pages/home/add-news/add-news.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModels } from './app-routing.model';
import { AlertErrorComponent } from './modules/shared/components/alert-error/alert-error.component';
import { NewsComponent } from './pages/home/news.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';

const routes: Routes = [
  { path: '', redirectTo: 'news', pathMatch: 'full' },
  { path: 'news', component: NewsComponent },
  { path: 'news/add-news', component: AddNewsComponent },
  { path: 'under-construction', component: UnderConstructionComponent },

  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: AppRoutingModels.ErrorPage,
    component: AlertErrorComponent,
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, RootGuard, LoggedGuard } from './_guards';

//Import the routes I would want to use
import { LoginComponent } from './LoginComponents/login/login.component';
import { HomeComponent } from './HomeComponents/home/home.component';
import { RootComponent } from './RootComponents/root/root.component';
import { RootLinkComponent } from './RootComponents/root-link/root-link.component';
import { RootRightsComponent } from './RootComponents/root-rights/root-rights.component';
import { RootBansComponent } from './RootComponents/root-bans/root-bans.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'root', component: RootComponent, canActivate: [RootGuard] },
  { path: 'link', component: RootLinkComponent, canActivate: [RootGuard] },
  { path: 'rights', component: RootRightsComponent, canActivate: [RootGuard] },
  { path: 'ban', component: RootBansComponent, canActivate: [RootGuard] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

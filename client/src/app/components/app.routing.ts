import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {SignupComponent} from "./signup/signup.component";
import {ProfileComponent} from "./profile/profile.component";
import {TestComponentComponent} from "./test-component/test-component.component";
import {AuthGuard} from "../auth/auth.guard";
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import {WeeksComponent} from './weeks/weeks.component';
import {RecipeComponent} from './recipe/recipe.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: HomeComponent,  data: {animation: 'HomePage'}},
  { path: 'start/:step', component: HomeComponent,  data: {animation: 'HomePage'}},
  { path: 'weeks', component: WeeksComponent, data: {animation: 'WeeksPage'}},
  { path: 'recipe/:recipeId', component: RecipeComponent, data: {animation: 'RecipePage'}},
  { path: 'coming-soon', component: ComingSoonComponent},
  { path: '**', redirectTo: '/start'},
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // { path: 'test', component: TestComponentComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

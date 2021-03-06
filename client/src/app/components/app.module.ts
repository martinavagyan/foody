import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {AppComponent} from './app.component';
import {TestComponentComponent} from './test-component/test-component.component';
import {ApiRequestsService} from '../services/api-requests.service';
import {HttpModule} from '@angular/http';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ConfigurationService} from '../services/configuration.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import {RouterModule} from "@angular/router";
import {routing} from "./app.routing";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuard} from "../auth/auth.guard";
import {AuthInterceptor} from "../auth/auth-interceptor.service";
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule, MatDialogModule, MatChipsModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule, MatMenuModule, MatSnackBarModule, MatTabsModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSidenavModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule, MatSlideToggleModule,
  MatTooltipModule,
  MatToolbarModule, MatDatepickerModule, MatExpansionModule, MatNativeDateModule, MatPaginatorModule, MatSortModule,
  MatStepperModule, MatTableModule,
} from '@angular/material';
import { IntroductionCarouselComponent } from './introduction-carousel/introduction-carousel.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { RecipeComponent } from './recipe/recipe.component';

import { SwiperModule } from 'angular2-useful-swiper';
import { WeeksComponent } from './weeks/weeks.component';
import { CookieLawModule } from 'angular2-cookie-law';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    PageNotFoundComponent,
    IntroductionCarouselComponent,
    ComingSoonComponent,
    RecipeComponent,
    WeeksComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    routing,
    SwiperModule,
    CookieLawModule,
    NgxUiLoaderModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    RouterModule,
    ApiRequestsService,
    ConfigurationService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

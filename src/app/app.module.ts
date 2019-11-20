import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AuthenticationService, AlumniService, GroupService, ScheduleService, AdminService } from './_services';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './UIComponents/navbar/navbar.component';
import { FooterComponent } from './UIComponents/footer/footer.component';

import { LoginComponent } from './LoginComponents/login/login.component';
import { LoginFormComponent, InfoModalLoginForm } from './LoginComponents/login-form/login-form.component';

import { HomeComponent } from './HomeComponents/home/home.component';
import { HomeMainComponent } from './HomeComponents/home-main/home-main.component';
import { HomeScheduleComponent } from './HomeComponents/home-schedule/home-schedule.component';

import { RootAlumniComponent } from './RootComponents/root-alumni/root-alumni.component';
import { RootRedButtonComponent } from './RootComponents/root-red-button/root-red-button.component';
import { RootComponent } from './RootComponents/root/root.component';
import { RootMainComponent } from './RootComponents/root-main/root-main.component';
import { RootGroupSearchComponent } from './RootComponents/root-group-search/root-group-search.component';
import { RootGroupScheduleComponent } from './RootComponents/root-group-schedule/root-group-schedule.component';
import { RootGroupDescriptionComponent, InfoModalAllAlumni } from './RootComponents/root-group-description/root-group-description.component';

import { RootLinkComponent } from './RootComponents/root-link/root-link.component';
import { RootLinkListComponent } from './RootComponents/root-link-list/root-link-list.component';
import { RootLinkFormComponent } from './RootComponents/root-link-form/root-link-form.component';
import { RootLinkMainComponent } from './RootComponents/root-link-main/root-link-main.component';
import { RootLinkAddComponent } from './RootComponents/root-link-add/root-link-add.component';

import { RootRightsComponent } from './RootComponents/root-rights/root-rights.component';
import { RootRightsMainComponent } from './RootComponents/root-rights-main/root-rights-main.component';
import { RootRightsFormComponent } from './RootComponents/root-rights-form/root-rights-form.component';
import { RootRightsListComponent } from './RootComponents/root-rights-list/root-rights-list.component';


import { RootBansComponent } from './RootComponents/root-bans/root-bans.component';
import { RootBansMainComponent } from './RootComponents/root-bans-main/root-bans-main.component';
import { RootBansUnbanComponent } from './RootComponents/root-bans-unban/root-bans-unban.component';
import { RootBansSearchComponent } from './RootComponents/root-bans-search/root-bans-search.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginFormComponent,
    FooterComponent,
    InfoModalLoginForm,
    HomeComponent,
    HomeMainComponent,
    RootAlumniComponent,
    RootRedButtonComponent,
    RootComponent,
    RootMainComponent,
    RootGroupSearchComponent,
    RootGroupScheduleComponent,
    RootGroupDescriptionComponent,
    InfoModalAllAlumni,
    HomeScheduleComponent,
    RootLinkComponent,
    RootLinkListComponent,
    RootLinkFormComponent,
    RootLinkMainComponent,
    RootLinkAddComponent,
    RootRightsComponent,
    RootRightsMainComponent,
    RootRightsFormComponent,
    RootRightsListComponent,
    RootBansComponent,
    RootBansMainComponent,
    RootBansUnbanComponent,
    RootBansSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    FullCalendarModule,
    FormsModule
  ],
  providers: [
    Title,
    AuthenticationService,
    AlumniService,
    ScheduleService,
    GroupService,
    AdminService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    InfoModalLoginForm,
    InfoModalAllAlumni,
    RootGroupScheduleComponent,
    RootGroupDescriptionComponent
  ]
})
export class AppModule {}

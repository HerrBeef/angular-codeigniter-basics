import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthentificationComponent } from "./components/authentification/authentification.component";
import { FormsModule } from "@angular/forms";
import { UserlistComponent } from "./components/userlist/userlist.component";
import { SearchPipe } from "./pipes/search.pipe";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { MovielistComponent } from "./components/movielist/movielist.component";
import { CreateMovieComponent } from "./components/createmovie/create-movie.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';


@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    UserlistComponent,
    SearchPipe,
    MovielistComponent,
    CreateMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    NgbDatepickerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot(),
    MomentModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

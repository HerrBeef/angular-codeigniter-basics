import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { MovielistComponent } from './components/movielist/movielist.component';
import { CreateMovieComponent } from './components/createmovie/create-movie.component';


const routes: Routes = [
  {
    path: 'authentification', component: AuthentificationComponent
  },
  {
    path: 'users', component: UserlistComponent
  },
  {
    path: 'movies', component: MovielistComponent,
  },
  {
    path: 'movies/create', component: CreateMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

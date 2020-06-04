import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getmovies() {
    return this.http.get("/api/movies/get", { withCredentials: true });
  }

  createmovie(name: string, description: string, releasedate: string) {
    return this.http.post('/api/movies/create', { name: name, description: description, releasedate: releasedate }, { withCredentials: true });
  }
}

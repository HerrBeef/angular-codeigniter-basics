import { Component, OnInit } from "@angular/core";
import { Movie } from "../../models/movie.model";
import { DatePipe } from "@angular/common";
import { MovieService } from "../../services/movie.service";

@Component({
  selector: "app-movielist",
  templateUrl: "./movielist.component.html",
  styleUrls: ["./movielist.component.scss"],
})
export class MovielistComponent implements OnInit {
  public filteredMovies: Movie[];
  public error: string = "";
  public query: string = "";
  public datequery: string = "";
  private movies: Movie[];
  private datepipe: DatePipe = new DatePipe("en");

  constructor(private movieService: MovieService) {
    this.movieService.getmovies().subscribe((data) => {
      if ((data as any).success) {
        this.movies = (data as any).movies;
        this.refillFilteredMovies();
      } else {
        this.error = (data as any).error;
      }
    });
  }

  refillFilteredMovies() {
    this.filteredMovies = this.movies;
  }

  filter() {
    let fieldsToSearch = ["name", "description"];
    this.filteredMovies = this.movies;

    if ((this.datequery == null || this.datequery == "") && this.query == "") {
      this.filteredMovies = this.movies;
    } else if (this.datequery != null && this.datequery != "") {
      let datequery = this.datepipe.transform(this.datequery, "yyyy-MM-dd");

      this.filteredMovies = this.movies.filter(
        (item) =>
          item.releasedate !== null &&
          new RegExp(datequery, "gi").test(item.releasedate)
      );
    }

    this.filteredMovies = this.filteredMovies.filter((item) =>
      fieldsToSearch.some(
        (key) =>
          item.hasOwnProperty(key) &&
          new RegExp(this.query.toLowerCase(), "gi").test(
            item[key].toLowerCase()
          )
      )
    );
  }

  ngOnInit(): void {}
}

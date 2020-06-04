import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { MovieService } from "../../services/movie.service";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-createmovie",
  templateUrl: "./createmovie.component.html",
  styleUrls: ["./createmovie.component.scss"],
})
export class CreateMovieComponent implements OnInit {
  private datepipe: DatePipe = new DatePipe("en");

  public createmovie(authForm: NgForm) {
    if (authForm.valid) {
      let releasedate = this.datepipe.transform(
        authForm.value.releasedate,
        "yyyy-MM-dd"
      );

      this.movieService
        .createmovie(
          authForm.value.name,
          authForm.value.description,
          releasedate
        )
        .subscribe((data) => {
          if ((data as any).success) {
          }
        });
    }
    else {
      this.toastr.error("Bitte überprüfe deine Eingaben!");
    }
  }

  constructor(private movieService: MovieService, private toastr: ToastrService) {}

  ngOnInit(): void {}
}

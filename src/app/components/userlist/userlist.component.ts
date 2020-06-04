import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.scss"]
})
export class UserlistComponent implements OnInit {
  public filteredUsers: User[];
  public error: string = "";
  public query: string = "";
  public datequery: string = "";
  private users: User[];
  private datepipe: DatePipe = new DatePipe("en");

  constructor(private userService: UserService) {
    this.userService.getusers().subscribe((data) => {
      if ((data as any).success) {
        this.users = (data as any).users;
        this.refillFilteredUsers();
      } else {
        this.error = (data as any).error;
      }
    });
  }

  refillFilteredUsers() {
    this.filteredUsers = this.users;
  }

  filter() {
    let fieldsToSearch = ["email", "username"];
    this.filteredUsers = this.users;

    if ((this.datequery == null || this.datequery == "") && this.query == "") {
      this.filteredUsers = this.users;
    } else if (this.datequery != null && this.datequery != "") {
      let datequery = this.datepipe.transform(this.datequery, "yyyy-MM-dd");

      this.filteredUsers = this.users.filter(
        (item) =>
          item.date_created !== null &&
          new RegExp(datequery, "gi").test(item.date_created)
      );
    }

    this.filteredUsers = this.filteredUsers.filter((item) =>
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

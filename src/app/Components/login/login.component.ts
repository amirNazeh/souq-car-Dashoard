import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private auth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  signIn() {
    this.authService
      .signIn(this.email, this.password)
      .then(() => {
        console.log("User signed in successfully");
        this.router.navigate(["/add-cars"]);
      })
      .catch((error) => {
        console.log("Error signing in:", error);
      });
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  }
}

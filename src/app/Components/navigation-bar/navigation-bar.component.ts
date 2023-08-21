import { Component } from "@angular/core";
import { AuthService } from "src/app/Services/auth.service";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"],
})
export class NavigationBarComponent {
  constructor(public authService: AuthService) {}

  getUserEmail(user: any) {
    // Check if user has an email
    if (user?.providerData?.length > 0) {
      return user.providerData[0].email || "Unknown";
    } else {
      return "Unknown";
    }
  }
}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AddCarsComponent } from "./Components/add-cars/add-cars.component";
import { EditAndDeleteCarsComponent } from "./Components/edit-and-delete-cars/edit-and-delete-cars.component";
import { LoginComponent } from "./Components/login/login.component";
import { NavigationBarComponent } from "./Components/navigation-bar/navigation-bar.component";
import { FormsModule } from "@angular/forms";

import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideDatabase, getDatabase } from "@angular/fire/database";
import { provideFirestore, getFirestore } from "@angular/fire/firestore";
import { provideStorage, getStorage } from "@angular/fire/storage";

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from "@angular/fire/compat";
import { FIREBASE_OPTIONS } from "@angular/fire/compat";
import { AuthGuard } from "./Guards/auth.guard";

@NgModule({
  declarations: [AppComponent, AddCarsComponent, EditAndDeleteCarsComponent, LoginComponent, NavigationBarComponent],
  // Added the Forms Module
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    FormsModule,
    //AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}

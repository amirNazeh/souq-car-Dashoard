import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { StringFormat } from "firebase/storage";
import { ICarForSale } from "src/app/Models/cars-for-sale-interface";
import { ISparePart } from "src/app/Models/spare-parts-interface";
import { IMaintenanceCenter } from "src/app/Models/maintenance-centers-interface";
import { CarsService } from "src/app/Services/cars.service";

@Component({
  selector: "app-add-cars",
  templateUrl: "./add-cars.component.html",
  styleUrls: ["./add-cars.component.scss"],
})
export class AddCarsComponent {
  carToAdd: ICarForSale = {} as ICarForSale;
  sparePartToAdd: ISparePart = {} as ISparePart;
  maintenanceCenterToAdd: IMaintenanceCenter = {} as IMaintenanceCenter;

  carsList: ICarForSale[] = [];

  selectedOption: string = "";
  isIdAvailable: boolean = false;

  constructor(private carService: CarsService, private router: Router) {}

  checkForIdAvailability(carId: any, collectionName: string, documentName: string): any {
    console.log(carId);
    console.log(documentName);

    this.carService
      .getCars(collectionName, documentName)
      .then((carsData) => {
        this.carsList = carsData;
      })
      .catch((error) => {
        console.log(error);
      });

    let result = this.carsList.filter((car: any) => car.id == carId);
    if (Object.keys(result).length === 0) {
      this.isIdAvailable = true;
      return true;
    } else {
      this.isIdAvailable = false;
      return false;
    }
  }

  addCar(collectionName: string, documentName: string) {
    this.carService.addCarToDB(this.carToAdd, collectionName, documentName);
  }
}

import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ICarForSale } from "src/app/Models/cars-for-sale-interface";
import { ISparePart } from "src/app/Models/spare-parts-interface";
import { IMaintenanceCenter } from "src/app/Models/maintenance-centers-interface";
import { CarsService } from "src/app/Services/cars.service";
import { ICarForRent } from "src/app/Models/cars-for-rent-interface";

@Component({
  selector: "app-edit-and-delete-cars",
  templateUrl: "./edit-and-delete-cars.component.html",
  styleUrls: ["./edit-and-delete-cars.component.scss"],
})
export class EditAndDeleteCarsComponent {
  carToEdit: ICarForSale = {} as ICarForSale;
  rentedCarToEdit: ICarForRent = {} as ICarForRent;
  sparePartToEdit: ISparePart = {} as ISparePart;
  maintenanceCenterToEdit: IMaintenanceCenter = {} as IMaintenanceCenter;

  carsForSaleList: ICarForSale[] = [];
  carsForRentList: ICarForSale[] = [];
  sparePartsList: ISparePart[] = [];
  maintenanceCentersList: IMaintenanceCenter[] = [];

  // The ID of the selected car
  selectedItemID: number = 0;

  selectedOption: string = "";
  isIdAvailable: boolean = false;

  temp: any;

  constructor(private dataService: CarsService, private router: Router) {}

  // Placing the initialization logic inside the constructor would lead to the logic being executed before the component has been initialized,
  // which can result in undefined behavior.
  ngOnInit() {
    this.dataService
      .getCars("cars", "cars_for_sale")
      .then((fetchedData) => {
        this.carsForSaleList = fetchedData;
      })
      .catch((error) => {
        console.log(error);
      });

    this.dataService
      .getCars("cars", "cars_for_rent")
      .then((fetchedData) => {
        this.carsForRentList = fetchedData;
      })
      .catch((error) => {
        console.log(error);
      });
    this.dataService
      .getCars("cars", "spare_parts")
      .then((fetchedData) => {
        this.sparePartsList = fetchedData;
      })
      .catch((error) => {
        console.log(error);
      });

    this.dataService
      .getCars("cars", "maintenance_centers")
      .then((fetchedData) => {
        this.maintenanceCentersList = fetchedData;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchSelectedCar() {
    console.log(this.selectedOption);
    console.log(this.selectedItemID);

    // If there is no selectedProduct then return, else call the getPRoductByID function in the service, and add the data to the ProductToEdit
    if (!this.selectedItemID) return;
    this.dataService
      .getCarByID(this.selectedItemID, "cars", this.selectedOption)
      .then((item) => {
        if (this.selectedOption == "cars_for_sale") this.carToEdit = item;
        if (this.selectedOption == "cars_for_rent") this.rentedCarToEdit = item;
        if (this.selectedOption == "spare_parts") this.sparePartToEdit = item;
        if (this.selectedOption == "maintenance_centers") this.maintenanceCenterToEdit = item;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editCar(collectionName: string, documentName: string) {
    if (this.selectedOption == "cars_for_sale") this.temp = this.carToEdit;
    if (this.selectedOption == "cars_for_rent") this.temp = this.rentedCarToEdit;
    if (this.selectedOption == "spare_parts") this.temp = this.sparePartToEdit;
    if (this.selectedOption == "maintenance_centers") this.temp = this.maintenanceCenterToEdit;

    this.dataService.updateCarData(this.temp, collectionName, documentName);
  }

  deleteCar(collectionName: string, documentName: string) {
    if (this.selectedOption == "cars_for_sale") this.temp = this.carToEdit;
    if (this.selectedOption == "cars_for_rent") this.temp = this.rentedCarToEdit;
    if (this.selectedOption == "spare_parts") this.temp = this.sparePartToEdit;
    if (this.selectedOption == "maintenance_centers") this.temp = this.maintenanceCenterToEdit;

    this.dataService.deleteCar(this.temp, collectionName, documentName);
  }
}

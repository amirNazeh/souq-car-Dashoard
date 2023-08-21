import { Injectable } from "@angular/core";
import { ICarForSale } from "../Models/cars-for-sale-interface";
import { Observable } from "rxjs";

// import { getFirestore } from 'firebase/firestore';
// import { collection, doc, setDoc } from 'firebase/firestore';
import { inject } from "@angular/core";

import { collection, collectionData, Firestore, addDoc, doc, getDoc, updateDoc, setDoc } from "@angular/fire/firestore";
import { update } from "firebase/database";
//import { collection, doc, setDoc } from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class CarsService {
  //cars: ICar[] = [];

  // dataCollection: collection<any>;

  //   const docRef = doc(db, "cities", "SF");
  // const docSnap = await getDoc(docRef);

  // if (docSnap.exists()) {
  //   console.log("Document data:", docSnap.data());
  // } else {
  //   // docSnap.data() will be undefined in this case
  //   console.log("No such document!");
  // }

  constructor(private firestore: Firestore) {}

  // Collection Name: "cars", Document Name: "cars_for_sale"
  addCarToDB(carDataToAdd: any, collectionName: string, documentName: string) {
    console.log(carDataToAdd);

    const collectionInstance = collection(this.firestore, collectionName);
    const docRef = doc(collectionInstance, documentName);

    getDoc(docRef)
      .then((docSnap) => {
        console.log(docRef);
        console.log(docSnap);

        if (docSnap.exists()) {
          console.log("1");

          // If the document exists, update the existing array with the new car data
          const existingCars = docSnap.data()["data"];
          console.log(existingCars);
          // const x = this.getDataFromDB();
          // console.log(x);

          const updatedCars = [...existingCars, carDataToAdd];
          console.log(updatedCars);

          updateDoc(docRef, { data: updatedCars , title: documentName})
            .then(() => {
              console.log("Data Added");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("2");

          // If the document doesn't exist, create a new document with the car data as an array
          const newCars = [carDataToAdd];
          setDoc(docRef, { data: newCars , title: documentName})
            .then(() => {
              console.log("Data Added");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // addCarToDB(carDataToAdd: any) {
  //   console.log(carDataToAdd);

  //   const collectionInstance = collection(this.firestore, 'testing');

  //   // Pass the collection instance and the data object we want to add to the firestore
  //   addDoc(collectionInstance, carDataToAdd)
  //     .then(() => {
  //       console.log('Data Added');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // getCarsFromDB(collectionName: string, documentName: string): any {
  //   const collectionInstance = collection(this.firestore, collectionName);
  //   const docRef = doc(collectionInstance, documentName);

  //   collectionData(collectionInstance).subscribe((val) => {
  //     return val;
  //   });
  // }

  // this is implemented using promises
  getCars(collectionName: string, documentName: string) {
    const collectionInstance = collection(this.firestore, collectionName);
    const docRef = doc(collectionInstance, documentName);

    return getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const carData = docSnap.data()["data"] || [];
          return carData;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  getCarByID(passedCarID: number, collectionName: string, documentName: string) {
    const collectionInstance = collection(this.firestore, collectionName);
    const docRef = doc(collectionInstance, documentName);

    return getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const carsData = docSnap.data()["data"] || [];
          const car = carsData.find((car: any) => car.id == passedCarID);
          return car || null;
        } else {
          return null;
        }
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  updateCarData(newCarData: any, collectionName: string, documentName: string) {
    const collectionInstance = collection(this.firestore, collectionName);
    const docRef = doc(collectionInstance, documentName);

    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const carsData = docSnap.data()["data"] || [];
          const updatedCars = carsData.map((car: any) => {
            if (car.id == newCarData.id) {
              return newCarData;
            }
            return car;
          });
          setDoc(docRef, { data: updatedCars , title: documentName });
        }
      })
      .then(() => {
        console.log("Car Replaced Successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteCar(carToDelete: any, collectionName: string, documentName: string) {
    const collectionInstance = collection(this.firestore, collectionName);
    const docRef = doc(collectionInstance, documentName);

    return getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const carData = docSnap.data()["data"] || [];
          const updatedCars = carData.filter((car: any) => car.id !== carToDelete.id);
          console.log(updatedCars);
          
          updateDoc(docRef, { data: updatedCars, title: documentName });
        }
      })
      .then(() => {
        console.log("Car deleted successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // citiesRef = collection(db, "cities");

  // // items: Observable<any[]>;
  // cars$ = collectionData(collection(this.firestore, 'cars')) as Observable<
  //   ICar[]
  // >;

  // cars: Observable<ICar[]>;
  // firestore: Firestore = inject(Firestore);

  // constructor() {
  //   const itemCollection = collection(this.firestore, 'cars');
  //   this.cars = collectionData(itemCollection);
  // }
  // constructor(private firestore: Firestore) {
  //   this.items = this.firestore.collection('your-collection').valueChanges();
  // }
}

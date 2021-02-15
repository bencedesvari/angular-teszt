import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Szamla } from "./szamla";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const szamlak = [
      {
        id: 1,
        nev: "Elso szamla",
        nevertek: "50000",
        penznem: "HUF",
        statusz: "Nem teljesített"
      }
    ];
    return { szamlak };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(szamlak: Szamla[]): number {
    return szamlak.length > 0
      ? Math.max(...szamlak.map(szamla => szamla.id)) + 1
      : 1;
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

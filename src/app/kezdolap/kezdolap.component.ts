import { Component, OnInit } from "@angular/core";
import { Szamla } from "../szamla";
import { SzamlaService } from "../szamla.service";

@Component({
  selector: "app-kezdolap",
  templateUrl: "./kezdolap.component.html",
  styleUrls: ["./kezdolap.component.css"]
})
export class KezdolapComponent implements OnInit {
  szamlak: Szamla[] = [];

  constructor(private szamlaService: SzamlaService) {}

  ngOnInit() {
    this.getSzamlak();
  }

  getSzamlak(): void {
    this.szamlaService
      .getSzamlak()
      .subscribe(szamlak => (this.szamlak = szamlak.slice(1, 5)));
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

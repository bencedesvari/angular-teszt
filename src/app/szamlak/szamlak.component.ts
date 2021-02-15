import { Component, OnInit } from "@angular/core";

import { Szamla } from "../szamla";
import { SzamlaService } from "../szamla.service";

@Component({
  selector: "app-szamlak",
  templateUrl: "./szamlak.component.html",
  styleUrls: ["./szamlak.component.css"]
})
export class SzamlakComponent implements OnInit {
  szamlak: Szamla[];

  constructor(private szamlaService: SzamlaService) {}

  ngOnInit() {
    this.getSzamlak();
  }

  getSzamlak(): void {
    this.szamlaService
      .getSzamlak()
      .subscribe(szamlak => (this.szamlak = szamlak));
  }

  add(nev: string): void {
    nev = nev.trim();
    if (!nev) {
      return;
    }
    this.szamlaService.addSzamla({ nev } as Szamla).subscribe(szamla => {
      this.szamlak.push(szamla);
    });
  }

  delete(szamla: Szamla): void {
    this.szamlak = this.szamlak.filter(sz => sz !== szamla);
    this.szamlaService.deleteSzamla(szamla).subscribe();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

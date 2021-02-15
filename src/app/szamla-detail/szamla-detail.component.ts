import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Szamla } from "../szamla";
import { SzamlaService } from "../szamla.service";

@Component({
  selector: "app-szamla-detail",
  templateUrl: "./szamla-detail.component.html",
  styleUrls: ["./szamla-detail.component.css"]
})
export class SzamlaDetailComponent implements OnInit {
  szamla: Szamla;

  constructor(
    private route: ActivatedRoute,
    private szamlaService: SzamlaService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSzamla();
  }

  getSzamla(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.szamlaService
      .getSzamla(id)
      .subscribe(szamla => (this.szamla = szamla));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.szamlaService.updateSzamla(this.szamla).subscribe(() => this.goBack());
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

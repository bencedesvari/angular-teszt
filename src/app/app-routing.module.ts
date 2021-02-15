import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { KezdolapComponent } from "./kezdolap/kezdolap.component";
import { SzamlakComponent } from "./szamlak/szamlak.component";
import { SzamlaDetailComponent } from "./szamla-detail/szamla-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/kezdolap", pathMatch: "full" },
  { path: "kezdolap", component: KezdolapComponent },
  { path: "detail/:id", component: SzamlaDetailComponent },
  { path: "szamlak", component: SzamlakComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/

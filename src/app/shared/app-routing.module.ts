import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MagazzinoComponent} from '../magazzino/magazzino.component'
import {OrdiniComponent} from '../ordini/ordini.component'
import {CostiComponent} from '../costi/costi.component'
import {MaterialiComponent} from '../materiali/materiali.component'
const appRoutes: Routes = [
  {path: 'magazzino', component: MagazzinoComponent},
  {path: 'materiali', component: MaterialiComponent},
  {path:'ordini', component: OrdiniComponent},
  {path:'costi', component: CostiComponent}

]

@NgModule({
  imports: [
   [RouterModule.forRoot(appRoutes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

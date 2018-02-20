import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MagazzinoComponent} from '../magazzino/magazzino.component'
import {OrdiniComponent} from '../ordini/ordini.component'
import {CostiComponent} from '../costi/costi.component'
import {MaterialiComponent} from '../materiali/materiali.component'
import {UmisuraComponent} from '../umisura/umisura.component'
import {CategorieArticoliComponent} from '../categorie-articoli/categorie-articoli.component'
import {FornitoriComponent} from '../fornitori/fornitori.component'

const appRoutes: Routes = [
  {path: 'magazzino', component: MagazzinoComponent},
  {path: 'articoli', component: MaterialiComponent},
  {path:'ordini', component: OrdiniComponent},
  {path:'costi', component: CostiComponent},
  {path:'umisura', component: UmisuraComponent},
  {path:'cat-articoli', component: CategorieArticoliComponent},
  {path:'fornitori', component: FornitoriComponent}

]

@NgModule({
  imports: [
   [RouterModule.forRoot(appRoutes)],
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

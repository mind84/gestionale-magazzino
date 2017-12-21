import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {AppRoutingModule} from './shared/app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {UmService} from './services/um.service'
import {CategorieArticoliService} from './services/categorie-articoli.service'



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MagazzinoComponent} from './magazzino/magazzino.component'
import {OrdiniComponent} from './ordini/ordini.component'
import {CostiComponent} from './costi/costi.component';
import { MaterialiComponent } from './materiali/materiali.component';
import { UmisuraComponent } from './umisura/umisura.component';
import { CategorieArticoliComponent } from './categorie-articoli/categorie-articoli.component';
import { NumberFormatPipe } from './shared/pipes/number-format.pipe';
import { DirectiveModule } from './shared/modules/directive.module';
import { UpdateFormComponent } from './shared/components/update-form.component';
import { UpdateCatComponent } from './shared/components/update-cat.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MagazzinoComponent,
    OrdiniComponent,
    CostiComponent,
    MaterialiComponent,
    UmisuraComponent,
    CategorieArticoliComponent,
    NumberFormatPipe,
    UpdateFormComponent,
    UpdateCatComponent
  ],
  imports: [
    BrowserModule,
    DirectiveModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    DirectiveModule
  ],
  providers: [UmService, CategorieArticoliService],
  bootstrap: [AppComponent]
})
export class AppModule { }

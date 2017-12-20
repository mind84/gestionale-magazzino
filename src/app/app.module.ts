import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {AppRoutingModule} from './shared/app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {UmService} from './services/um.service'



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MagazzinoComponent} from './magazzino/magazzino.component'
import {OrdiniComponent} from './ordini/ordini.component'
import {CostiComponent} from './costi/costi.component';
import { MaterialiComponent } from './materiali/materiali.component';
import { UmisuraComponent } from './umisura/umisura.component';
import { CategorieArticoliComponent } from './categorie-articoli/categorie-articoli.component';
import { NumberFormatPipe } from './shared/pipes/number-format.pipe';
import { FormatNumberDirective } from './shared/directives/format-number.directive';
import { UpdateFormComponent } from './shared/components/update-form.component'


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
    FormatNumberDirective,
    UpdateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [UmService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {AppRoutingModule} from './shared/app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import {UmService} from './services/um.service'
import {CategorieArticoliService} from './services/categorie-articoli.service'
import {MaterialiService} from './services/materiali.service'
import {FornitoriService} from './services/fornitori.service'



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
import { AngularMaterialModule } from './shared/modules/angular-material.module';
import { DisplayResponseComponent } from './shared/components/display-response.component';
import { TextSearchComponent } from './shared/components/text-search.component';
import { DynamicFormComponent } from './shared/components/dynamic-form.component';
import { FormInputComponent } from './shared/components/controls/form-input.component';
import { FormSelectComponent } from './shared/components/controls/form-select.component';
import { FormButtonComponent } from './shared/components/controls/form-button.component';
import { FormFieldErrorDisplayComponent } from './shared/components/form-field-error-display.component';
import { FornitoriComponent } from './fornitori/fornitori.component';

//import {addMotivation} from './shared/classes/addMotivation'



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
    DisplayResponseComponent,
    TextSearchComponent,
    DynamicFormComponent,
    FormInputComponent,
    FormSelectComponent,
    FormButtonComponent,
    FormFieldErrorDisplayComponent,
    FornitoriComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DirectiveModule,
    AppRoutingModule,
    AngularMaterialModule,
    ButtonsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    DirectiveModule
  ],
  entryComponents: [DisplayResponseComponent, TextSearchComponent, FormInputComponent, FormButtonComponent, FormSelectComponent],
  providers: [UmService, CategorieArticoliService, MaterialiService, FornitoriService],
  bootstrap: [AppComponent]
})
export class AppModule { }

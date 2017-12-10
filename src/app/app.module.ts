import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { HttpClientModule }    from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {AppRoutingModule} from './shared/app-routing.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MagazzinoComponent} from './magazzino/magazzino.component'
import {OrdiniComponent} from './ordini/ordini.component'
import {CostiComponent} from './costi/costi.component';
import { MaterialiComponent } from './materiali/materiali.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MagazzinoComponent,
    OrdiniComponent,
    CostiComponent,
    MaterialiComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

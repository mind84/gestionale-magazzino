import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'

export interface MaterialiItem {
    _id?:any,
    code:string,
    name:string,
    fornitore:string,
    price:number,
    collobj:number,
    note?:string
    qta:number,
    umId:string,
    categ:number,
    totalInStore: {
      date:Date,
      tot:number
    }
}

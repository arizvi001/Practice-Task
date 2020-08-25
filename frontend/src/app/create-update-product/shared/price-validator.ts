import {AbstractControl} from '@angular/forms'

export function forbiddenPriceValidator(control: AbstractControl):{[key:string]:any}{
    if (control.value == ""||control.value == null)  return null;
    const forbidden = control.value < 0;
    return forbidden ? {'forbiddenPrice':{value:control.value}}:null;
}

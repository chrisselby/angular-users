import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'userAddress'})
export class UserAddressPipe implements PipeTransform {
  transform(value: Address): string {
    let returnedAddress = value.address1;
    if(value.address2) {
        returnedAddress += ', ' + value.address2;
    }
    returnedAddress += '\n';
    if(value.city) {
        returnedAddress += value.city + ', ';
    }
    if(value.state) {
        returnedAddress += value.state + ' ';
    }
    if(value.zip) {
        returnedAddress += value.zip;
    }
    return returnedAddress;
  }
}

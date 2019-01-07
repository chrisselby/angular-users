import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '../models/currency';
/*
* Raise the value exponentially
* Takes an exponent argument that defaults to 1.
* Usage:
*   value | exponentialStrength:exponent
* Example:
*   {{ 2 | exponentialStrength:10 }}
*   formats to: 1024
*/
@Pipe({name: 'currency'})
export class CurrencyPipe implements PipeTransform {
    addCommas(input) {
        return input.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    transform(value: Currency): string {
        let returnedString = '';
        let amount = value.amount.toString();
        let decimal = amount.substring(amount.length - 2);
        let rest = amount.substring(0, amount.length - 2);
        switch(value.currency) {
            case 'USD':
                returnedString += '$';
                break;
            case 'GBP':
                returnedString += '£';
                break;
            case 'EUR':
                returnedString += '€';
                break;
            default:
                returnedString += '?';
        }
        returnedString += this.addCommas(rest) + '.' + decimal;
        return returnedString;
    }
}

import { Address } from './address';
import { Currency } from './currency';

export class User {
    id: number;
    first_name: string;
    last_name: string;
    address: Address;
    deleted: boolean;
    order_total: Currency;
}

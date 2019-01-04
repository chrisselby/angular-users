import { Address } from './address';

export class User {
    id: number;
    first_name: string;
    last_name: string;
    address: Address;
    deleted: boolean;
}

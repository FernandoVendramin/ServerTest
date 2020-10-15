import { BaseModel } from './base/basemodel';
import { Client } from './client';

export interface ClientAddress extends BaseModel {
    clientId: number;
    client: Client;
    address: string;
    number: number;
    country: string;
    city: string;
    state: string;
    district: string;
    postalCode: string;
}
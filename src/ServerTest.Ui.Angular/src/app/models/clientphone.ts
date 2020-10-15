import { BaseModel } from './base/basemodel';
import { Client } from './client';

export interface ClientPhone extends BaseModel {
    clientId: number;
    client: Client;
    phoneNumber: string;
}
import { BaseModel } from './base/basemodel';
import { ClientAddress } from './clientaddress';
import { ClientPhone } from './clientphone';
import { ClientType } from './clienttype';

export interface Client extends BaseModel {
    socialReason: string;
    fantasyName: string;
    cpf: string;
    rg: string;
    birthDataTime: Date;
    clientTypeId: number;
    clientType: ClientType;
    addresses: ClientAddress[];
    phones: ClientPhone[];
}
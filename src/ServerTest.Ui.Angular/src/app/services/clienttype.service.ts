import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { ClientType } from '../models/clienttype';



@Injectable()
export class ClientTypeService {

    constructor(private httpClient: HttpClient) { }

    public getAll(): Observable<ClientType[]> {
        return this.httpClient.get<ClientType[]>(
            `${environment.apiBaseURL}/api/clienttype`
        );
    }
}
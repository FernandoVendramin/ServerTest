import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';

import { Client } from '../models/client';


@Injectable()
export class ClientService {

    constructor(private httpClient: HttpClient) { }

    public getAll(take: number): Observable<Client[]> {
        return this.httpClient.get<Client[]>(
            `${environment.apiBaseURL}/api/client?take=${take}`
        );
    }

    public getById(id: number): Observable<Client> {
        return this.httpClient.get<Client>(
            `${environment.apiBaseURL}/api/client/${id}`
        );
    }

    public post(client: Client): Observable<Client> {
        return this.httpClient.post<Client>(
            `${environment.apiBaseURL}/api/client`, 
            client
        );
    }
}
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientAddress } from 'src/app/models/clientaddress';
import { ClientType } from 'src/app/models/clienttype';
import { ClientService } from 'src/app/services/client.service';
import { ClientTypeService } from 'src/app/services/clienttype.service';
import { StateChange } from 'src/app/utils/statechange';

@Component({
  selector: 'app-client-form-devexpress',
  templateUrl: './client-form-devexpress.component.html',
  styleUrls: ['./client-form-devexpress.component.css']
})
export class ClientFormDevexpressComponent implements OnInit {

  client: Client = null;
  clientTypes: ClientType[] = null;
  clientAddressesDeleted: ClientAddress[] = [];
  id: number;

  constructor(
    private clientService: ClientService,
    private clientTypeService: ClientTypeService,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.id = 1;
    this.loadClient();
    this.loadClientType();
  }

  private loadClient() {
    this.clientService.getById(this.id)
      .subscribe({
          next: (response: Client) => {
              this.client = response;
          },
          error: (error: Error) => {
              console.error(`Unexpected error. Error message: ${error.message}`)
          }
      })
  }

  private loadClientType() {
    this.clientTypeService.getAll()
      .subscribe({
        next: (response: ClientType[]) => {
            this.clientTypes = response;
        },
        error: (error: Error) => {
            console.error(`Unexpected error. Error message: ${error.message}`)
        }
    });
  }
  
  onRowInsertedAddress(e) {
    e.data.stateChange = StateChange.Inserted;
  }

  onRowUpdatedAddress(e) {
    e.data.stateChange = StateChange.Updated;
  }

  onRowRemovedAddress(e) {
    var data = e.data;
    const deletedAddress: ClientAddress = {
      id: 0,
      editionDateTime: new Date(),
      stateChange: StateChange.Deleted,
      clientId: this.client.id,
      client: null,
      address: data.address,
      city: data.city,
      country: data.country,
      district: data.district,
      number: data.number,
      postalCode: data.postalCode,
      state: data.state,
    };

    this.clientAddressesDeleted.push(deletedAddress);
  }

  onSubmit() {
    console.log(this.client);

    this.clientAddressesDeleted.forEach(address => {
      this.client.addresses.push(address);
    });

    this.clientService.post(this.client)
      .subscribe({
        next: (response: Client) => {
            this.toastrService.success("Cliente salvo com sucesso!", "Sucesso", {
              positionClass: "toast-bottom-right"
            });
            console.log(response);
        },
        error: (error: Error) => {
          this.toastrService.error(`Unexpected error. Error message: ${error.message}`, "Erro", {
            positionClass: "toast-bottom-right"
          });
        }
      });
  }

}

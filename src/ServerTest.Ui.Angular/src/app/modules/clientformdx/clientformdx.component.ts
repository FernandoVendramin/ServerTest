import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientAddress } from 'src/app/models/clientaddress';
import { ClientPhone } from 'src/app/models/clientphone';
import { ClientType } from 'src/app/models/clienttype';
import { ClientService } from 'src/app/services/client.service';
import { ClientTypeService } from 'src/app/services/clienttype.service';
import { StateChange } from 'src/app/utils/statechange';

@Component({
  selector: 'app-clientformdx',
  templateUrl: './clientformdx.component.html',
  styleUrls: ['./clientformdx.component.css']
})
export class ClientformdxComponent implements OnInit {

  faPlus = faPlus;
  faEdit = faEdit;

  client: Client = null;
  clientTypes: ClientType[] = null;
  clientAddressesDeleted: ClientAddress[] = [];
  clientPhoneForm: FormGroup;

  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private clientTypeService: ClientTypeService,
    private toastrService: ToastrService,
    config: NgbModalConfig, 
    private modalService: NgbModal
    ) {
      config.backdrop = 'static';
      config.keyboard = false;
    }

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

  onEditPhone(e) {
    console.log(e.data);
  }

  onInsertPhone(e) {
    console.log(e.data);
  }

  openPhoneModal(content, phone) {
    this.clientPhoneForm = this.formBuilder.group({
      id: [phone?.id ?? null, Validators.required],
      clientId: [phone?.clientId ?? null, Validators.required],
      phoneNumber: [phone?.phoneNumber ?? null, [Validators.required, Validators.minLength(8)]],
      editionDateTime: [phone?.editionDateTime ?? null, Validators.required],
      stateChange: [phone?.stateChange != null ? StateChange.Updated :  StateChange.Inserted, Validators.required],
    });

    this.modalService.open(content, { centered: true });
  }

  savePhoneModal() {
    const myPhone: ClientPhone = {
      id: this.clientPhoneForm.value.id,
      editionDateTime: new Date(),
      stateChange: this.clientPhoneForm.value.stateChange,
      clientId: this.client.id,
      client: null,
      phoneNumber: this.clientPhoneForm.value.phoneNumber
    };

    if (myPhone.stateChange == StateChange.Updated)
    {
      this.client.phones.forEach(phone => {
        if (phone.id == myPhone.id) {
          phone.phoneNumber = myPhone.phoneNumber;
        }
      });
    }
    else{
      this.client.phones.push(myPhone);
    }

    this.modalService.dismissAll();
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

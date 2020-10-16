import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/models/client';
import { ClientAddress } from 'src/app/models/clientaddress';
import { ClientPhone } from 'src/app/models/clientphone';
import { ClientType } from 'src/app/models/clienttype';
import { ClientService } from 'src/app/services/client.service';
import { ClientTypeService } from 'src/app/services/clienttype.service';
import { StateChange } from 'src/app/utils/statechange';

@Component({
  selector: 'app-clientform',
  templateUrl: './clientform.component.html',
  styleUrls: ['./clientform.component.css']
})
export class ClientFormComponent implements OnInit {
  
  faTrash = faTrash;
  
  clientForm: FormGroup;
  client: Client = null;
  clientTypes: ClientType[] = null;
  id: number;

  constructor(
    private clientService: ClientService,
    private clientTypeService: ClientTypeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.buildForm();    
    this.id = 1;
    this.loadClient();
    this.loadClientType();
  }

  private loadClient() {
    this.clientService.getById(this.id)
      .subscribe({
          next: (response: Client) => {
              this.client = response;
              this.patchForm();
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

  createAddress(address : ClientAddress) {
    return this.formBuilder.group({
      id: [address?.id ?? null, Validators.required],
      clientId: [address?.clientId ?? null, Validators.required],
      address: [address?.address ?? null, Validators.required],
      number: [address?.number ?? null, Validators.required],
      country: [address?.country ?? null, Validators.required],
      city: [address?.city ?? null, Validators.required],
      state: [address?.state ?? null, Validators.required],
      district: [address?.district ?? null, Validators.required],
      postalCode: [address?.postalCode ?? null, Validators.required],
      stateChange: [address?.stateChange ?? null, Validators.required],
    });
  }

  createPhone(phone : ClientPhone) {
    return this.formBuilder.group({
      id: [phone?.id ?? null, Validators.required],
      clientId: [phone?.clientId ?? null, Validators.required],
      phoneNumber: [phone?.phoneNumber ?? null, [Validators.required, Validators.minLength(8)]],
      editionDateTime: [phone?.editionDateTime ?? null, Validators.required],
      stateChange: [phone?.stateChange ?? null, Validators.required],
    });
  }

  private buildForm() {
    this.clientForm = this.formBuilder.group({
      socialReason: [null, [Validators.required, Validators.minLength(3)]],
      fantasyName: [null, [Validators.required, Validators.minLength(3)]],
      rg: [null, Validators.required],
      cpf: [null, Validators.required],
      birthDataTime: [null, Validators.required],
      clientTypeId: [null, Validators.required],
      addresses: this.formBuilder.array([]),
      phones: this.formBuilder.array([])
    });
  }

  get clientFormControls() { return this.clientForm.controls; }
  get addressFormArray() { return this.clientFormControls.addresses as FormArray; }
  get phoneFormArray() { return this.clientFormControls.phones as FormArray; }

  private patchForm() {
    this.clientForm.patchValue({
      socialReason: this.client.socialReason,
      fantasyName: this.client.fantasyName,
      rg: this.client.rg,
      cpf: this.client.cpf,
      birthDataTime: this.client.birthDataTime,
      clientTypeId: this.client.clientTypeId,
    });

    this.client.addresses.forEach(address => {
      this.addressFormArray.push(this.createAddress(address));
    });

    this.client.phones.forEach(phone => {
      this.phoneFormArray.push(this.createPhone(phone));
    });
  }

  addPhone() {
    this.phoneFormArray.push(this.createPhone(null));
  }

  addAddress() {
    this.addressFormArray.push(this.createAddress(null));
  }

  removePhone(index) {
    this.phoneFormArray.controls[index].value.stateChange = StateChange.Deleted;

    var phoneFormElement = document.getElementById(`phoneForm${index}`);
    phoneFormElement.classList.add("hidden");
  }

  removeAddress(index) {
    this.addressFormArray.controls[index].value.stateChange = StateChange.Deleted;

    var addressFormElement = document.getElementById(`addressForm${index}`);
    addressFormElement.classList.add("hidden");
  }

  private mapFormValuesToModel(){
    this.client.socialReason = this.clientForm.value.socialReason;
    this.client.fantasyName = this.clientForm.value.fantasyName;
    this.client.rg = this.clientForm.value.rg;
    this.client.cpf = this.clientForm.value.cpf;
    this.client.birthDataTime = this.clientForm.value.birthDataTime;
    this.client.clientTypeId = +this.clientForm.value.clientTypeId;
    this.client.clientType = this.clientTypes.filter((value) => {
      return value.id == this.client.clientTypeId;
    })[0];

    this.client.addresses = [];
    this.addressFormArray.controls.forEach((addressControl: FormGroup) => {
      const newAddress: ClientAddress = {
        id: addressControl.value.id,
        editionDateTime: new Date(),
        stateChange: addressControl.value.stateChange ?? StateChange.Inserted,
        clientId: this.client.id,
        client: null,
        address: addressControl.value.address,
        number: addressControl.value.number,
        country: addressControl.value.country,
        city: addressControl.value.city,
        state: addressControl.value.state,
        district: addressControl.value.district,
        postalCode: addressControl.value.postalCode,
      };

      if (!(newAddress.id == null && newAddress.stateChange == StateChange.Deleted))
        this.client.addresses.push(newAddress);
    });

    this.client.phones = [];
    this.phoneFormArray.controls.forEach((phoneControl: FormGroup) => {
      const newPhone: ClientPhone = {
        id: phoneControl.value.id,
        editionDateTime: new Date(),
        stateChange: phoneControl.value.stateChange ?? StateChange.Inserted,
        clientId: this.client.id,
        client: null,
        phoneNumber: phoneControl.value.address
      };

      if (!(newPhone.id == null && newPhone.stateChange == StateChange.Deleted))
        this.client.phones.push(newPhone);
    });

    this.client.stateChange = StateChange.Updated;
  }

  checkValidAndTouch(control) {
    return !control.valid && control.touched;
  }
  applyErrorClass(control : AbstractControl) {
    return {
      'is-invalid': this.checkValidAndTouch(control)
    }
  }

  onSubmit() {    
    if (this.clientForm.valid)
    {
      this.mapFormValuesToModel();
      console.log(this.client);
  
      this.clientService.post(this.client)
        .subscribe({
          next: (response: Client) => {
              this.toastrService.success("Cliente salvo com sucesso!", "Sucesso", {
                positionClass: "toast-bottom-right"
              });
              console.log(response);
          },
          error: (error: Error) => {
              console.error(`Unexpected error. Error message: ${error.message}`)
          }
        });
    }
    else
    {
      Object.keys(this.clientForm.controls).forEach(field => {
        const control = this.clientForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });

      this.addressFormArray.controls.forEach(group => {
        let myGroup = group as FormGroup;

        Object.keys(myGroup.controls).forEach(field => {
          const control = myGroup.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      });

      this.phoneFormArray.controls.forEach(group => {
        let myGroup = group as FormGroup;

        Object.keys(myGroup.controls).forEach(field => {
          const control = myGroup.get(field);
          control?.markAsTouched({ onlySelf: true });
        });
      });
    }
  }
}

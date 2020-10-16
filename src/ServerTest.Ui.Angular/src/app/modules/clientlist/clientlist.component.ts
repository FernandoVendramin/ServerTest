import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Client } from 'src/app/models/client';
import { ClientType } from 'src/app/models/clienttype';
import { ClientService } from 'src/app/services/client.service';
import { ClientTypeService } from 'src/app/services/clienttype.service';

@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.css']
})
export class ClientlistComponent implements OnInit {

  client: Client[] = [];
  clientTypes: ClientType[] = null;
  form: FormGroup;
  
  constructor(
    private clientService: ClientService,
    private clientTypeService: ClientTypeService,
    private formBuilder: FormBuilder,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.loadClient(50);
    this.loadClientType();

    this.form = this.formBuilder.group({
      take: [50]
    });
  }

  searchClient() {
    this.loadClient(this.form.get('take').value);
  }

  private loadClient(take :number) {
    this.clientService.getAll(take)
      .subscribe({
          next: (response: Client[]) => {
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

}

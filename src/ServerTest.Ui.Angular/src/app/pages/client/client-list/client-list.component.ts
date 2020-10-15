import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  client: Client[] = [];
  form: FormGroup;
  
  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loadClient(50);

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

}

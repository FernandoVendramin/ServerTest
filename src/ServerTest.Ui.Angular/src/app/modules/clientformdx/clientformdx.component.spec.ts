import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientformdxComponent } from './clientformdx.component';

describe('ClientformdxComponent', () => {
  let component: ClientformdxComponent;
  let fixture: ComponentFixture<ClientformdxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientformdxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientformdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

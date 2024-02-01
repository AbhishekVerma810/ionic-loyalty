import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerInterfacePage } from './customer-interface.page';

describe('CustomerInterfacePage', () => {
  let component: CustomerInterfacePage;
  let fixture: ComponentFixture<CustomerInterfacePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomerInterfacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

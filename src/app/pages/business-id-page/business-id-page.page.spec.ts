import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessIdPagePage } from './business-id-page.page';

describe('BusinessIdPagePage', () => {
  let component: BusinessIdPagePage;
  let fixture: ComponentFixture<BusinessIdPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusinessIdPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

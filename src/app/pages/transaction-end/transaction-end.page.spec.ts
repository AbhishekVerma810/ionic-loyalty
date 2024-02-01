import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionEndPage } from './transaction-end.page';

describe('TransactionEndPage', () => {
  let component: TransactionEndPage;
  let fixture: ComponentFixture<TransactionEndPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TransactionEndPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

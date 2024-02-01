import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodeScreenPage } from './code-screen.page';

describe('CodeScreenPage', () => {
  let component: CodeScreenPage;
  let fixture: ComponentFixture<CodeScreenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CodeScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

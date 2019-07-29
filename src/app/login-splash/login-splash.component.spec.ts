import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSplashComponent } from './login-splash.component';

describe('LoginSplashComponent', () => {
  let component: LoginSplashComponent;
  let fixture: ComponentFixture<LoginSplashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginSplashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

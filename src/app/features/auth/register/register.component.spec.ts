import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../../shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.registrationForm.get('username')?.value).toBe('');
    expect(component.registrationForm.get('email')?.value).toBe('');
  });

  it('should call userService.register on form submit', () => {
    const mockResponse = { id: 1, username: 'test', email: 'test@mail.com' };
    userService.register.and.returnValue(of(mockResponse));

    component.registrationForm.patchValue({
      username: 'test',
      email: 'test@example.com'
    });

    component.onSubmit();

    expect(userService.register).toHaveBeenCalled();
  });

  it('should show error message on registration failure', () => {
    const errorResponse = { error: { message: 'Registration failed' } };
    userService.register.and.returnValue(throwError(() => errorResponse));

    component.registrationForm.patchValue({
      username: 'test',
      email: 'test@example.com'
    });

    component.onSubmit();
    fixture.detectChanges();

    expect(component.errorMessage).toContain('Registration failed');
  });
});

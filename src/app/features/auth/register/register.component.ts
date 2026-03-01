import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';
import { UserRegistrationRequest } from '../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  loading = false;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registrationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const registrationRequest: UserRegistrationRequest = {
      username: this.registrationForm.get('username')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value
    };

    this.userService.register(registrationRequest).subscribe({
      next: (response) => {
        this.loading = false;
        this.successMessage = `Đăng ký thành công! ID: ${response.id}`;
        this.registrationForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Đăng ký thất bại. Vui lòng thử lại!';
      }
    });
  }

  resetForm(): void {
    this.registrationForm.reset();
    this.submitted = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}

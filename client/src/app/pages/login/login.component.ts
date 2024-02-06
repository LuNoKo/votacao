import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { AuthService } from '../../../app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [RouterLink, CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      cpf: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.dadosForm['cpf'].setValue('02621539041');
    this.dadosForm['password'].setValue('teste');
  }

  get dadosForm() {
    return this, this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .login(this.dadosForm['cpf'].value, this.dadosForm['password'].value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            alert(error);
          },
        });
    }
  }

  // getErrorMessage(controlName: string): string {
  //   const control = this.loginForm.get(controlName);
  //   if (control && control.errors && 'serverError' in control.errors) {
  //     return control.errors['serverError'];
  //   }
  //   return '';
  // }

  // private handleServerError(error: any) {
  //   const errors = error?.error?.message;

  //   if (errors && Array.isArray(errors)) {
  //     errors.forEach((err) => {
  //       const control = this.loginForm.get(err.path);

  //       if (control) {
  //         control.setErrors({ serverError: err.message });
  //       }
  //     });
  //   }
  // }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { UsersService } from '../../services/users/users.service';
import { CustomValidatorsDirective } from '../../directives/CustomValidators';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [provideNgxMask()],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private userService: UsersService,
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [
        Validators.required,
        CustomValidatorsDirective.CpfValidator,
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get dadosForm() {
    return this, this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService
        .registerUser({
          name: this.dadosForm['name'].value,
          cpf: this.dadosForm['cpf'].value,
          password: this.dadosForm['password'].value,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
        });
    }
  }
}

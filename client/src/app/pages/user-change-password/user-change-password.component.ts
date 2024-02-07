import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-user-change-password',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-change-password.component.html',
  styleUrl: './user-change-password.component.css',
})
export class UserChangePasswordComponent {
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  changePasswordForm!: FormGroup;
  userId: string = '';

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get('id') as string;
    });
    this.changePasswordForm = new FormGroup({
      lastPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  get dadosForm() {
    return this, this.changePasswordForm.controls;
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.userService
        .updatePasswordUser({
          userId: this.userId,
          lastPassword: this.dadosForm['lastPassword'].value,
          newPassword: this.dadosForm['newPassword'].value,
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/users']);
          },
        });
    }
  }
}

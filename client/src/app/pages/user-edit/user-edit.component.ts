import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { AllUsers, User, UserType } from '../../models/User';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent {
  constructor(
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}
  user: AllUsers = {} as AllUsers;
  allUserTypes: UserType[] = [];
  userEditForm!: FormGroup;
  selected: any;

  ngOnInit() {
    this.userEditForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') as string;

      this.userService.getOneUserById(id).subscribe((response) => {
        this.user = response;
        this.dadosForm['name'].setValue(response.name);
        this.dadosForm['type'].setValue(response.type);

        this.userService.getUserTypes().subscribe((response) => {
          this.allUserTypes = response;
        });
      });
    });
  }

  get dadosForm() {
    return this, this.userEditForm.controls;
  }

  onSubmit() {
    if (this.userEditForm.valid) {
      this.userService
        .updateUser(this.user.id, {
          name: this.dadosForm['name'].value,
          type: this.dadosForm['type'].value,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
        });
    }
  }
}

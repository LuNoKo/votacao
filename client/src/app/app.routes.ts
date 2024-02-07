import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthAdminGuard } from './guards/auth/auth-admin.guard';
import { SubjectComponent } from './pages/subject/subject.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { UserChangePasswordComponent } from './pages/user-change-password/user-change-password.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'login', component: LoginComponent, canActivate: [] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [],
  },
  { path: 'subject/:id', component: SubjectComponent, canActivate: [] },
  {
    path: 'create',
    component: CreateSubjectComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'users/changePassword/:id',
    component: UserChangePasswordComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'users/edit/:id',
    component: UserEditComponent,
    canActivate: [AuthAdminGuard],
  },
];

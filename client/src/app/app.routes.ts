import { Routes } from '@angular/router';

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
];

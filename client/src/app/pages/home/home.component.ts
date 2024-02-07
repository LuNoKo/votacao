import { Component, LOCALE_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule, formatDate, registerLocaleData } from '@angular/common';
import { SubjectWithId } from '../../models/Subject';
import { SubjectsService } from '../../services/subjects/subjects.service';
import localePt from '@angular/common/locales/pt';
import { Category } from '../../models/Category';

registerLocaleData(localePt, 'pt');

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  allSubjects: SubjectWithId[] = [];
  allCategories: Category[] = [];
  subjects: SubjectWithId[] = [];

  constructor(
    private authService: AuthService,
    private subjectsService: SubjectsService,
  ) {}

  ngOnInit() {
    this.subjectsService.getAllSubject().subscribe((response) => {
      this.allSubjects = response;
      this.subjects = response;
    });
    this.subjectsService.getAllCategories().subscribe((response) => {
      this.allCategories = response;
    });
  }

  get showAdminComponents() {
    return this.authService.isAdmin();
  }

  activateUntilTranslated(activeUntil: string) {
    return formatDate(new Date(activeUntil), 'dd/MM/yyyy HH:mm', 'pt-BR');
  }

  subjectVoteTimeEnded(activeUntil: string) {
    return new Date(activeUntil) < new Date();
  }

  search(e: any): void {
    const value = (e.target as HTMLInputElement).value;

    this.subjects = this.allSubjects.filter((subject) =>
      subject.category.includes(value),
    );
  }

  getCategoryDescription(categoryType: string) {
    const category = this.allCategories?.find(
      (entry) => entry.value === categoryType,
    );

    if (category) {
      return category.description;
    } else {
      return 'Tipo de usuário desconhecido';
    }
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { SubjectWithId } from '../../models/Subject';
import { CommonModule, formatDate } from '@angular/common';
import { Category } from '../../models/Category';
import { VotesService } from '../../services/votes/votes.service';
import { SubjectResultComponent } from '../../components/subject-result/subject-result.component';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule, RouterLink, SubjectResultComponent],
  templateUrl: './subject.component.html',
})
export class SubjectComponent {
  subject: SubjectWithId = {} as SubjectWithId;
  allCategories: Category[] = [];
  hasUserVoted: boolean = false;
  showButtons = false;
  activateUntilTranslated: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private subjectsService: SubjectsService,
    private authService: AuthService,
    private votesService: VotesService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id') as string;

      this.subjectsService.getOneSubjectById(id).subscribe((response) => {
        this.subject = response;
        this.activateUntilTranslated = formatDate(
          new Date(this.subject.activeUntil),
          'dd/MM/yyyy HH:mm',
          'pt-BR',
        );

        if (this.authService.isUserAuthenticated()) {
          this.votesService
            .HasUserVotedBySubject(this.subject.id)
            .subscribe((response) => {
              this.hasUserVoted = response;
              this.showButtons = true;
            });
        }
      });
    });
    this.subjectsService.getAllCategories().subscribe((response) => {
      this.allCategories = response;
    });
  }

  get showAdminComponents() {
    return this.authService.isAdmin();
  }

  get isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
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

  get subjectVoteTimeEnded() {
    return new Date(this.subject.activeUntil) < new Date();
  }

  vote(answer: boolean) {
    this.votesService.createVote(this.subject.id, answer).subscribe({
      next: (response) => {
        this.router.navigate(['/']);
      },
    });
  }
}

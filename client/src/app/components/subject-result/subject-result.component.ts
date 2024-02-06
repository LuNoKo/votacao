import { Component, Input } from '@angular/core';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { VotesService } from '../../services/votes/votes.service';
import { Subject } from 'rxjs';
import { VoteResult } from '../../models/Vote';

@Component({
  selector: 'app-subject-result',
  standalone: true,
  imports: [],
  templateUrl: './subject-result.component.html',
  styleUrl: './subject-result.component.css',
})
export class SubjectResultComponent {
  @Input('subjectId') subjectId!: string;
  result: VoteResult = { yes: 0, no: 0 };

  constructor(private votesService: VotesService) {}

  ngOnInit() {
    this.votesService.getResult(this.subjectId).subscribe((response) => {
      this.result = response;
    });
  }
}

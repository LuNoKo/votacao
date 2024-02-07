import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SubjectsService } from '../../services/subjects/subjects.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../models/Category';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css',
})
export class CreateSubjectComponent {
  subjectForm!: FormGroup;
  allCategories: Category[] = [];

  constructor(
    private router: Router,
    private subjectsService: SubjectsService
  ) {
    this.subjectForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      activeUntil: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.subjectsService.getAllCategories().subscribe((response) => {
      this.allCategories = response;
    });
  }

  get dadosForm() {
    return this, this.subjectForm.controls;
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      this.subjectsService
        .createSubject({
          title: this.dadosForm['title'].value,
          description: this.dadosForm['description'].value,
          category: this.dadosForm['category'].value,
          activeUntil: new Date(
            this.dadosForm['activeUntil'].value
          ).toISOString(),
        })
        .subscribe({
          next: (response) => {
            this.router.navigate(['/']);
          },
        });
    }
  }
}

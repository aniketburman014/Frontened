import { Component } from '@angular/core';
import { Feedback } from '../model/Feedback';
import { FeedbackService } from '../services/feedback.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-feedback',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  feedbacks: Feedback[] = [];
  query: string = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getAll().subscribe((data) => {
      this.feedbacks = data;
    });
  }

  searchFeedbacks(): void {
    this.feedbackService.search(this.query).subscribe((data) => {
      this.feedbacks = data;
    });
  }

  deleteFeedback(id: number): void {
    this.feedbackService.delete(id).subscribe(() => {
      this.loadFeedbacks();
    });
  }
}

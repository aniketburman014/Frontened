import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../model/Feedback';
@Component({
  selector: 'app-form',
  imports: [FormsModule,],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  feedback: Feedback = {
    id: 0,
    name: '',
    email: '',
    message: '',
    createdAt: new Date(),
  };

  constructor(private feedbackService: FeedbackService) {}

  submitFeedback() {
    this.feedbackService.addFeedback(this.feedback).subscribe(
      (response) => {
        console.log('Feedback successfully submitted:', response);
        alert('Thank you for your feedback!');
        this.resetForm();
      },
      (error) => {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback. Please try again.');
      }
    );
  }

  resetForm() {
    this.feedback = {
      id: 0,
      name: '',
      email: '',
      message: '',
      createdAt: new Date(),
    };
  }
}

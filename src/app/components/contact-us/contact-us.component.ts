import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AnimationDirective } from '../../directives/animation.directive';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AnimationDirective],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  myForm: FormGroup;
  loading: boolean = false; // To show a loading indicator
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  // Submit form to the API (Vercel)
  submitForm() {
    if (this.myForm.valid) {
      this.loading = true; // Set loading to true
      const formData = this.myForm.value;

      // Send the form data to the serverless function
      this.http.post('https://vercel-api-demo-omega.vercel.app/api/send-mai', formData).subscribe(
        (response: any) => {
          this.loading = false; // Set loading to false
          this.successMessage =
            'Thank you for your message! We will get back to you soon.';
          this.errorMessage = '';
          this.myForm.reset();
        },
        (error) => {
          this.loading = false; // Set loading to false
          this.errorMessage =
            'There was an error sending your message. Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-screen" [class.fade-out]="loaded">
      <div class="spinner-container">
        <div class="logo">
          <img src="assets/images/logo.jpg" alt="Logo" />
        </div>
        <div class="spinner"></div>
        <h2 class="loading-text">HI-TECH STEELS</h2>
      </div>
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--primary-color);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
    }
    
    .fade-out {
      opacity: 0;
      visibility: hidden;
    }
    
    .spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      margin-bottom: 20px;
      border: 3px solid var(--secondary-color);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s ease-in-out infinite;
      margin-bottom: 20px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .loading-text {
      color: #fff;
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: 2px;
    }
  `]
})
export class LoadingComponent implements OnInit {
  loaded = false;

  constructor() { }

  ngOnInit(): void {
    // Simulate loading time
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }
}

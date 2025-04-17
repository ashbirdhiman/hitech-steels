import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `{{ displayValue }}`,
  styles: []
})
export class CounterComponent implements OnInit {
  @Input() startValue: number = 0;
  @Input() endValue: number = 100;
  @Input() duration: number = 2000;
  @Input() decimals: number = 0;
  
  displayValue: string | number = 0;
  private animationFrameId: number | null = null;
  private startTime: number | null = null;

  ngOnInit() {
    // Start the counter animation when an intersection observer detects it's in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    setTimeout(() => {
      const statsContainer = document.querySelector('.stats-container');
      if (statsContainer) {
        observer.observe(statsContainer);
      }
    }, 500);
  }

  animateCount() {
    this.startTime = null;
    this.updateCounter();
  }

  updateCounter(timestamp?: number) {
    if (!this.startTime && timestamp) {
      this.startTime = timestamp;
    }
    
    if (this.startTime && timestamp) {
      const elapsedTime = timestamp - this.startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      
      const currentValue = this.startValue + (this.endValue - this.startValue) * this.easeOutCubic(progress);
      this.displayValue = this.decimals > 0 ? currentValue.toFixed(this.decimals) : Math.floor(currentValue);
      
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame((time) => this.updateCounter(time));
      } else {
        this.displayValue = this.endValue;
      }
    } else {
      this.animationFrameId = requestAnimationFrame((time) => this.updateCounter(time));
    }
  }

  easeOutCubic(x: number): number {
    return 1 - Math.pow(1 - x, 3);
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

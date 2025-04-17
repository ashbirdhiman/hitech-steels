import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor-follower',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cursor-dot"></div>
    <div class="cursor-circle"></div>
  `,
  styles: [`
    .cursor-dot,
    .cursor-circle {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .cursor-dot {
      width: 8px;
      height: 8px;
      background-color: var(--primary-color);
    }
    
    .cursor-circle {
      width: 40px;
      height: 40px;
      border: 2px solid var(--primary-color);
    }
    
    .cursor-active {
      opacity: 1;
    }
    
    @media (max-width: 768px) {
      .cursor-dot, .cursor-circle {
        display: none;
      }
    }
  `]
})
export class CursorFollowerComponent implements AfterViewInit, OnDestroy {
  dot: HTMLElement | null = null;
  circle: HTMLElement | null = null;
  mouseMoveListener: (() => void) | null = null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.dot = document.querySelector('.cursor-dot');
    this.circle = document.querySelector('.cursor-circle');
    
    if (this.dot && this.circle) {
      // Only activate on desktop
      if (window.innerWidth > 768) {
        this.activateCursor();
      }
    }
  }

  activateCursor() {
    if (this.dot && this.circle) {
      this.renderer.addClass(this.dot, 'cursor-active');
      this.renderer.addClass(this.circle, 'cursor-active');
      
      this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (event: MouseEvent) => {
        // Update dot position immediately
        this.renderer.setStyle(this.dot, 'transform', `translate(${event.clientX}px, ${event.clientY}px)`);
        
        // Update circle position with slight delay for trailing effect
        setTimeout(() => {
          if (this.circle) {
            this.renderer.setStyle(this.circle, 'transform', `translate(${event.clientX}px, ${event.clientY}px)`);
          }
        }, 100);
      });
      
      // Add hover effects for links and buttons
      const interactiveElements = document.querySelectorAll('a, button, .product-card');
      interactiveElements.forEach(element => {
        this.renderer.listen(element, 'mouseenter', () => {
          this.renderer.addClass(this.circle, 'cursor-hover');
          this.renderer.setStyle(this.circle, 'transform', 'translate(-50%, -50%) scale(1.5)');
          this.renderer.setStyle(this.circle, 'background-color', 'rgba(26, 60, 110, 0.1)');
        });
        
        this.renderer.listen(element, 'mouseleave', () => {
          this.renderer.removeClass(this.circle, 'cursor-hover');
          this.renderer.setStyle(this.circle, 'transform', 'translate(-50%, -50%) scale(1)');
          this.renderer.setStyle(this.circle, 'background-color', 'transparent');
        });
      });
    }
  }

  ngOnDestroy() {
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
  }
}

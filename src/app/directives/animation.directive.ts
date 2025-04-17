import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAnimation]',
  standalone: true
})
export class AnimationDirective implements OnInit {
  @Input() animationType: string = 'fade-in';
  @Input() delay: number = 0;
  @Input() duration: number = 1;
  @Input() triggerOnce: boolean = true;

  private observer: IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupAnimation();
  }

  private setupAnimation() {
    // Set initial styles
    const element = this.el.nativeElement;
    element.style.opacity = '0';
    element.style.transition = `all ${this.duration}s ease ${this.delay}s`;

    // Create intersection observer
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element comes into view
          setTimeout(() => {
            element.style.opacity = '1';
            this.applyAnimationStyle(element);
          }, 100);

          if (this.triggerOnce) {
            this.observer?.unobserve(element);
          }
        } else if (!this.triggerOnce) {
          // Reset animation when element goes out of view
          element.style.opacity = '0';
          this.resetAnimationStyle(element);
        }
      });
    }, options);

    this.observer.observe(element);
  }

  private applyAnimationStyle(element: HTMLElement) {
    switch (this.animationType) {
      case 'fade-in':
        // Already handled by opacity
        break;
      case 'slide-in-left':
        element.style.transform = 'translateX(0)';
        break;
      case 'slide-in-right':
        element.style.transform = 'translateX(0)';
        break;
      case 'slide-in-up':
        element.style.transform = 'translateY(0)';
        break;
      case 'slide-in-down':
        element.style.transform = 'translateY(0)';
        break;
      case 'zoom-in':
        element.style.transform = 'scale(1)';
        break;
      default:
        break;
    }
  }

  private resetAnimationStyle(element: HTMLElement) {
    switch (this.animationType) {
      case 'slide-in-left':
        element.style.transform = 'translateX(-100px)';
        break;
      case 'slide-in-right':
        element.style.transform = 'translateX(100px)';
        break;
      case 'slide-in-up':
        element.style.transform = 'translateY(100px)';
        break;
      case 'slide-in-down':
        element.style.transform = 'translateY(-100px)';
        break;
      case 'zoom-in':
        element.style.transform = 'scale(0.5)';
        break;
      default:
        break;
    }
  }
}

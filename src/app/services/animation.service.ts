import { Injectable, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observer: IntersectionObserver | null = null;

  constructor(private ngZone: NgZone) {}

  initScrollAnimation() {
    this.ngZone.runOutsideAngular(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const animation = element.dataset['animation'];

            if (animation) {
              element.classList.add(animation);
              this.observer?.unobserve(element);
            }
          }
        });
      }, options);

      // Observe all elements with data-animation attribute
      document.querySelectorAll('[data-animation]').forEach(element => {
        this.observer?.observe(element);
      });
    });
  }

  destroyScrollAnimation() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

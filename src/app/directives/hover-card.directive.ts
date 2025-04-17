import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverCard]',
  standalone: true
})
export class HoverCardDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'card-hover');
    
    // Create and add a glare effect element
    const glareElement = this.renderer.createElement('div');
    this.renderer.addClass(glareElement, 'card-glare');
    this.renderer.appendChild(this.el.nativeElement, glareElement);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    // Apply transform to card
    this.renderer.setStyle(
      this.el.nativeElement, 
      'transform', 
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
    
    // Update glare position
    const glare = this.el.nativeElement.querySelector('.card-glare');
    if (glare) {
      const percentX = x / rect.width * 100;
      const percentY = y / rect.height * 100;
      this.renderer.setStyle(glare, 'background', `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)`);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'card-hover');
    
    // Reset transform
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)');
    
    // Remove glare element
    const glare = this.el.nativeElement.querySelector('.card-glare');
    if (glare) {
      this.renderer.removeChild(this.el.nativeElement, glare);
    }
  }
}

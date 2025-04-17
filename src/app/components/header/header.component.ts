import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopHeaderComponent } from '../top-header/top-header.component';
import { AnimationDirective } from '../../directives/animation.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TopHeaderComponent, AnimationDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      const parallaxBg = document.querySelector('.parallax-bg') as HTMLElement;
      if (parallaxBg) {
        // Apply parallax effect
        const scrollPosition = window.scrollY;
        const translateY = scrollPosition * 0.5;
        parallaxBg.style.transform = `translate3d(0, ${translateY}px, 0)`;
      }
    }
  }
}

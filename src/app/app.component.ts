import { Component, OnInit, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomizeOptionsComponent } from './components/customize-options/customize-options.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CursorFollowerComponent } from './components/cursor-follower/cursor-follower.component';
import { AnimationService } from './services/animation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    HeaderComponent,
    ProductsComponent,
    CustomizeOptionsComponent,
    AboutUsComponent,
    ContactUsComponent,
    CategoriesComponent,
    FooterComponent,
    LoadingComponent,
    CursorFollowerComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'hi-tech-steels';
  showBackToTop = false;
  sections: HTMLElement[] = [];
  currentSectionIndex = 0;
  isScrolling = false;
  touchStartY = 0;

  constructor(private animationService: AnimationService) {}

  ngOnInit() {
    // Enable smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const targetId = target.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });

    // Add scroll event listener for header shrink
    window.addEventListener('scroll', this.handleScroll);
  }

  ngAfterViewInit() {
    // Initialize scroll animations after view is initialized
    setTimeout(() => {
      this.animationService.initScrollAnimation();
      this.sections = Array.from(document.querySelectorAll('.section'));
    }, 300);

    // Add intersection observer for section tracking
    this.initSectionObserver();
  }

  ngOnDestroy() {
    // Clean up event listeners and observers
    window.removeEventListener('scroll', this.handleScroll);
    this.animationService.destroyScrollAnimation();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 500;
  }

  @HostListener('window:wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    // Only handle smooth scrolling if not already scrolling
    if (!this.isScrolling && Math.abs(event.deltaY) > 30) {
      this.handleSectionScroll(event.deltaY > 0);
    }
  }

  @HostListener('window:touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = this.touchStartY - touchEndY;
    
    // Only handle significant touch movements
    if (Math.abs(deltaY) > 50 && !this.isScrolling) {
      this.handleSectionScroll(deltaY > 0);
    }
  }

  private handleScroll = () => {
    const header = document.querySelector('.header');
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  private initSectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = this.sections.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            this.currentSectionIndex = index;
            // Update active menu item
            this.updateActiveMenuItem(entry.target.id);
          }
        }
      });
    }, options);

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  private updateActiveMenuItem(sectionId: string) {
    document.querySelectorAll('.menu a').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('click')?.includes(sectionId)) {
        item.classList.add('active');
      }
    });
  }

  private handleSectionScroll(scrollDown: boolean) {
    if (this.isScrolling) return;

    this.isScrolling = true;
    let targetIndex = this.currentSectionIndex;

    if (scrollDown && targetIndex < this.sections.length - 1) {
      targetIndex++;
    } else if (!scrollDown && targetIndex > 0) {
      targetIndex--;
    }

    const targetSection = this.sections[targetIndex];
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.currentSectionIndex = targetIndex;
    }

    // Reset scrolling flag after animation completes
    setTimeout(() => {
      this.isScrolling = false;
    }, 800);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

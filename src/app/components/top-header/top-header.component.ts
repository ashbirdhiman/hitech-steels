import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class TopHeaderComponent {
  isMenuVisible = false;
  activeSection = 'home';

  constructor(private scrollService: ScrollService) {
    this.scrollService.activeSection$.subscribe(sectionId => {
      this.activeSection = sectionId;
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  closeMenu() {
    this.isMenuVisible = false;
  }

  scrollToSection(sectionId: string) {
    this.scrollService.scrollToSection(sectionId);
    this.closeMenu();
  }
}

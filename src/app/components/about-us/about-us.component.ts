import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationDirective } from '../../directives/animation.directive';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, AnimationDirective, CounterComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationDirective } from '../../directives/animation.directive';

@Component({
  selector: 'app-customize-options',
  standalone: true,
  imports: [CommonModule, AnimationDirective],
  templateUrl: './customize-options.component.html',
  styleUrls: ['./customize-options.component.scss']
})
export class CustomizeOptionsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

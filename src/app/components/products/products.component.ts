import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationDirective } from '../../directives/animation.directive';
import { HoverCardDirective } from '../../directives/hover-card.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AnimationDirective, HoverCardDirective],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

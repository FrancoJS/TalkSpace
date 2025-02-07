import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar-button',
  imports: [NgClass],
  templateUrl: './nav-bar-button.component.html',
  styleUrl: './nav-bar-button.component.css',
})
export class NavBarButtonComponent {
  @Input() iconSrc!: string;
  @Input() ariaLabel!: string;
  @Input() imgAlt!: string;
  @Input() isActive!: boolean;
}

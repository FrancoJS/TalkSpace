import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeNavBarComponent } from '../../shared/components/home-nav-bar/home-nav-bar.component';
import { HomeFooterComponent } from '../../shared/components/home-footer/home-footer.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HomeNavBarComponent, HomeFooterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}

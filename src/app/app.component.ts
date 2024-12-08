import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { MainComponent } from "./main/main.component";
import { SideNavComponent } from "./side-nav/side-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, HeaderComponent, MainComponent, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Industry';
}

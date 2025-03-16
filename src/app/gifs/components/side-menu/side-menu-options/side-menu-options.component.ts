import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/GifService';

interface MenuOption{
  icon:string;
  label:string;
  route:string;
  subLabel:string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent {

  lastSearch = inject(GifService)

  
  menuOptions:MenuOption[] = [
    {
      icon:'fa-solid fa-chart-line',
      label:'Trending',
      route:'trending',
      subLabel:'Gifs Populares'
    },
    {
      icon:'fa-solid fa-magnifying-glass',
      label:'Searchs',
      route:'search',
      subLabel:'Busquedas'
    }
  ]




 }

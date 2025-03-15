import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GifsListItemsComponent } from "./gifs-list-items/gifs-list-items.component";

@Component({
  selector: 'gifs-list',
  imports: [GifsListItemsComponent],
  templateUrl: './gifs-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsListComponent {

    gifs = input.required<string[]>();

 }

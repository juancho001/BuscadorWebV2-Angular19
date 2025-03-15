import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gifs-list-items',
  imports: [],
  templateUrl: './gifs-list-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifsListItemsComponent {

  imageUrl = input.required<string>();

 }

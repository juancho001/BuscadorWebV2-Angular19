import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";
import { GifService } from '../../services/GifService';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifServiceSarch = inject(GifService);
  gifSearch = signal<Gif[]>([]);

  onSearch(serach: string) {
    this.gifServiceSarch.searchGifs(serach).subscribe(response => {
      this.gifSearch.set(response);
    });
  }
}

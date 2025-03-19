import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/GifService';
import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gifs-history-page',
  imports: [GifsListComponent],
  templateUrl: './gifs-history-page.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifsHistoryPageComponent {

  // query = inject(ActivatedRoute).params.subscribe( (params) =>{
  //   console.log(params['query']);
  // })

  gifsService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(
    () => {
      return this.gifsService.getHistoryGifs(this.query());
    }
  )
}

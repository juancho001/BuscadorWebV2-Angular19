import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiPhyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'History'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifsParse = JSON.parse(gifsFromLocalStorage);
  return gifsParse;
}


@Injectable({
  providedIn: 'root'
})
export class GifService {
  private trendingPage = signal(0);
  trendingGifsLoading = signal(false);
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([])
  trendingGifSearch = signal<Gif[]>([])

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));

  trendingGifsGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  })


  constructor() {
    this.loadTrendingImage();
  }

  loadTrendingImage() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http.get<GiPhyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.trendingPage() * 20,
      }
    }).subscribe((response) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingPage.update(currentPage => currentPage + 1);
      this.trendingGifsLoading.set(false);
      //console.log({gifs});
    })
  }

  searchGifs(search: string) {
    return this.http.get<GiPhyResponse>(`${environment.giphyUrl}/${environment.giphySearchUrl}`, {
      params: {
        api_key: environment.giphyApiKey,
        q: search,
        limit: 20,
        offset: 0
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      // Historial
      tap(items => {
        this.searchHistory.update(history => ({
          ...history, [search.toLowerCase()]: items
        }))
      })
    )

    // .subscribe((response) => {
    //   const gifSerach = GifMapper.mapGiphyItemsToGifArray(response.data);
    //   this.trendingGifSearch.set(gifSerach);
    //   console.log({gifSerach})
    // })
  }


  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  saveHistoryToLocalStorage = effect(() => {
    const historyToString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyToString);
  })

}

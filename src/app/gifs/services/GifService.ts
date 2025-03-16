import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiPhyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([])
  trendingGifSearch = signal<Gif[]>([])
  trendingGifsLoading = signal(true);

  searchHistory = signal<Record<string,Gif[]>>({});
  searchHistoryKey = computed(() => Object.keys(this.searchHistory()));
  constructor() {
    this.loadTrendingImage();
   }

  loadTrendingImage(){
    this.http.get<GiPhyResponse>(`${environment.giphyUrl}/gifs/trending`,{
      params:{
        api_key:environment.giphyApiKey,
        limit:20,
        //offset:0
      }
    }).subscribe((response)=>{
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
      console.log({gifs});
    })
  }

  searchGifs(search:string){
   return this.http.get<GiPhyResponse>(`${environment.giphyUrl}/${environment.giphySearchUrl}`,{
      params:{
        api_key:environment.giphyApiKey,
        q:search,
        limit:20,
        offset:0
      }
    }).pipe(
      map(({data}) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      // Historial
      tap( items => {
        this.searchHistory.update(history => ({
          ...history,[search.toLowerCase()]:items
        }))
      })
    )

    // .subscribe((response) => {
    //   const gifSerach = GifMapper.mapGiphyItemsToGifArray(response.data);
    //   this.trendingGifSearch.set(gifSerach);
    //   console.log({gifSerach})
    // })
  }

}

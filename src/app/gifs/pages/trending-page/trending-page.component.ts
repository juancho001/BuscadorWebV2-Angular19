import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/GifService';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent implements AfterViewInit {
  // images = signal(imagesUrls);
  gifService = inject(GifService);
  pageScrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.pageScrollStateService.pageScrollState();
  }


  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeigth = scrollDiv.clientHeight;
    const scrollHeigth = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeigth + 300 >= scrollHeigth;
    console.log({ scrollTop, clientHeigth, isAtBottom });
    this.pageScrollStateService.pageScrollState.set(scrollTop);

    if (isAtBottom) {
      //TODO: se inicia el proceso para realizar la nueva peticion y cargar mas imagenes
      this.gifService.loadTrendingImage();
    }
  }
}

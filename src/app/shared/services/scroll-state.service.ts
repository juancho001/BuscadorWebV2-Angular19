import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  pageScrollState = signal(0);
  // constructor() { }

}

import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() { }

    showType: WritableSignal<any> = signal(false)
}

import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'child',
  template: `<img src="http://image.tmdb.org/t/p/w185/{{imgPath}}" class="mov"/>
            `
})
export class ChildComponent {
    
    @Input()
    imgPath: string;

    constructor(){
        this.imgPath = '';
    }
}
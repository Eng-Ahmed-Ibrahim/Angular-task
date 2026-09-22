  import { Component } from '@angular/core';
  import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

  @Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
  })
  export class App {
    isActive: boolean = false
    display: boolean = true;
    log(event:any){
      let value = event.target.value;
      console.log(value);
      
    }
  }

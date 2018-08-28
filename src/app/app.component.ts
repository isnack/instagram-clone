import { Component, OnInit } from '@angular/core';
import * as fb from 'firebase';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  ngOnInit(): void {
    fb.initializeApp(environment.firebase);
  }
}

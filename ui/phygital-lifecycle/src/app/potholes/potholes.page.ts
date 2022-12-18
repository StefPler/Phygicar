import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-potholes',
  templateUrl: './potholes.page.html',
  styleUrls: ['./potholes.page.scss'],
})
export class PotholesPage implements OnInit {
  items: any[] = [{ lat: "423.5543", long: "543.1233", estimatedSize: "small"}, {lat: "423.5543", long: "543.1233", estimatedSize: "medium"}];
  constructor() { }

  ngOnInit() {
  }

}

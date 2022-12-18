import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  @Input() clickable: boolean = false;
  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() items: any[] = [];
  
  constructor(private router: Router) {}

  navigateToPotholes() {
    this.router.navigate(['/potholes']);
  }

  ngOnInit() {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {
  @Input() userditeles: any;
  constructor() { }

  ngOnInit(): void {
   }
  

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ct-authbar',
  templateUrl: './authbar.component.html',
  styleUrls: ['./authbar.component.scss']
})
export class AuthbarComponent implements OnInit {
  @Input() user: any;
  @Input() lineStatus: boolean;

  constructor() { }

  ngOnInit() {
  }

}

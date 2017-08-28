import {Component, OnInit, Input} from '@angular/core';
import {User} from '../../models/user.model';

@Component({
  selector: 'ct-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() users: User[];
  constructor() { }

  ngOnInit() {
  }

}

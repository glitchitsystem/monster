import { Component, OnInit, Input} from '@angular/core';

import { Monster } from '../../monster.model';

@Component({
  selector: 'app-monster-item',
  templateUrl: './monster-item.component.html',
  styleUrls: ['./monster-item.component.css']
})
export class MonsterItemComponent implements OnInit {
  @Input() monster: Monster;
  @Input() index: number

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';

import { Monster } from '../monster.model';
import { MonsterService } from '../monster.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-monster-detail',
  templateUrl: './monster-detail.component.html',
  styleUrls: ['./monster-detail.component.css']
})
export class MonsterDetailComponent implements OnInit {
  monster: Monster;
  id: number

  constructor(private monsterService: MonsterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.monster = this.monsterService.getMonster(this.id)
      }
    )
  }

  onEditMonster() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteMonster() {
    this.monsterService.deleteMonster(this.id)
    this.router.navigate(['/mine'])
  }
}

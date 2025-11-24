import { Component, OnInit, OnDestroy } from '@angular/core';

import { Monster } from '../monster.model';
import { MonsterService } from '../monster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css']
})
export class MonsterListComponent implements OnInit, OnDestroy {
  monsters: Monster[]
  subscription: Subscription

  constructor(private monsterService: MonsterService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.monsterService.monstersChanged.subscribe(
      (monsters: Monster[]) => {
        this.monsters = monsters
      }
    )
    this.monsters = this.monsterService.getMonsters()
  }

  onNewMonster() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  onRandomMonster() {
    this.monsterService.addRandomMonster()
    this.onClickedButton()
  }

  onRemoveAll() {
    if (confirm("Are you sure you want to remove all monsters?")) {
      this.monsterService.removeAll()
      this.onClickedButton()
    }
  }

  onUnfavoriteAll() {
    this.monsterService.unfavoriteAll()
    this.onClickedButton()
  }

  onCreateTeam() {
    this.monsterService.createRandomTeam()
    this.onClickedButton()
  }

  onSort() {
    this.monsterService.sortMonsters()
  }

  onClickedButton() {
    this.router.navigate(['../mine'], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}

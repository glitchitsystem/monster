import { Component, OnInit, Input } from "@angular/core";

import { Monster } from "../../monster.model";
import { MonsterService } from "../../monster.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-monster-item",
  templateUrl: "./monster-item.component.html",
  styleUrls: ["./monster-item.component.css"],
})
export class MonsterItemComponent implements OnInit {
  @Input() monster: Monster;
  @Input() index: number;

  constructor(
    private monsterService: MonsterService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  onToggleFavorite(event: Event) {
    if (event) event.stopPropagation();
    this.monsterService.toggleFavorite(this.index);
  }

  onDuplicate(event: Event) {
    if (event) event.stopPropagation();
    this.router.navigate([this.index, "edit"], {
      relativeTo: this.route,
      queryParams: { duplicate: "true" },
      queryParamsHandling: "merge",
    });
  }
}

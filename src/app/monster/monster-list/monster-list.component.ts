import { Component, OnInit, OnDestroy } from "@angular/core";

import { Monster } from "../monster.model";
import { MonsterService } from "../monster.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { DialogService } from "../../shared/dialog.service";

@Component({
  selector: "app-monster-list",
  templateUrl: "./monster-list.component.html",
  styleUrls: ["./monster-list.component.css"],
})
export class MonsterListComponent implements OnInit, OnDestroy {
  monsters: Monster[];
  viewMonsters: Monster[];
  subscription: Subscription;
  searchTerm = "";
  selectedRole = "all";
  favoritesOnly = false;
  sortOption: "name-asc" | "name-desc" | "role-asc" = "name-asc";
  roleCounts = { soldier: 0, medic: 0, shield: 0, thief: 0, mage: 0 };

  constructor(
    private monsterService: MonsterService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.subscription = this.monsterService.monstersChanged.subscribe(
      (monsters: Monster[]) => {
        this.monsters = monsters;
        this.updateRoleCounts();
        this.applyFilters();
      }
    );
    this.monsters = this.monsterService.getMonsters();
    this.updateRoleCounts();
    this.applyFilters();
  }

  onNewMonster() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  onRandomMonster() {
    this.monsterService.addRandomMonster();
    this.onClickedButton();
  }

  onRemoveAll() {
    this.dialogService
      .openConfirmDialog("Are you sure you want to remove all monsters?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.monsterService.removeAll();
          this.onClickedButton();
        }
      });
  }

  onUnfavoriteAll() {
    this.monsterService.unfavoriteAll();
    this.onClickedButton();
  }

  onCreateTeam() {
    this.monsterService.createRandomTeam();
    this.onClickedButton();
  }

  onSort() {
    this.applyFilters();
  }

  onClickedButton() {
    this.router.navigate(["../mine"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchChange() {
    this.applyFilters();
  }
  onRoleChange() {
    this.applyFilters();
  }
  onFavoritesToggle() {
    this.applyFilters();
  }
  onSortChange() {
    this.applyFilters();
  }

  private updateRoleCounts() {
    const counts = { soldier: 0, medic: 0, shield: 0, thief: 0, mage: 0 };
    for (const m of this.monsters) {
      if (counts.hasOwnProperty(m.role)) (counts as any)[m.role]++;
    }
    this.roleCounts = counts;
  }

  private applyFilters() {
    const term = this.searchTerm.trim().toLowerCase();
    let list = [...this.monsters];
    if (term) {
      list = list.filter((m) => (m.name || "").toLowerCase().includes(term));
    }
    if (this.selectedRole !== "all") {
      list = list.filter((m) => m.role === this.selectedRole);
    }
    if (this.favoritesOnly) {
      list = list.filter((m) => !!m.favorite);
    }
    // sort
    const [key, dir] = this.sortOption.split("-");
    list.sort((a: any, b: any) => {
      const av = (a[key] || "").toString().toLowerCase();
      const bv = (b[key] || "").toString().toLowerCase();
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    this.viewMonsters = list;
  }

  onExport() {
    const data = JSON.stringify(this.monsters, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monsters.json";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  onImportFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) return;
        this.dialogService
          .openConfirmDialog("Import will replace current monsters. Continue?")
          .afterClosed()
          .subscribe((res) => {
            if (res) {
              const normalized = parsed.map(
                (m: any) =>
                  new Monster(m.name, m.description, !!m.favorite, m.role || "")
              );
              this.monsterService.setMonsters(normalized);
            }
          });
      } catch (e) {
        // invalid JSON; ignore
      }
    };
    reader.readAsText(file);
    // reset input value to allow re-importing same file
    input.value = "";
  }
}

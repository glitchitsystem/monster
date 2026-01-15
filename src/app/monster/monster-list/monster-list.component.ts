import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ViewChild,
  ElementRef,
} from "@angular/core";

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

  // Pagination
  currentPage = 1;
  pageSize = 10;
  pagedMonsters: Monster[] = [];
  totalPages = 0;
  Math = Math; // Expose Math to template

  @ViewChild("listHeader") listHeader: ElementRef;

  constructor(
    private monsterService: MonsterService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    // Load state from query params
    this.route.queryParams.subscribe((params) => {
      this.searchTerm = params["search"] || "";
      this.selectedRole = params["role"] || "all";
      this.favoritesOnly = params["favorites"] === "true";
      this.sortOption = params["sort"] || "name-asc";
      this.currentPage = parseInt(params["page"]) || 1;
      this.applyFilters();
    });

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
    this.router.navigate(["new"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }

  onRandomMonster() {
    this.monsterService.addRandomMonster();
    this.onClickedButton();
    setTimeout(() => this.focusOnListHeader(), 100);
  }

  onRemoveAll() {
    this.dialogService
      .openConfirmDialog("Are you sure you want to remove all monsters?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.monsterService.removeAll();
          this.onClickedButton();
          setTimeout(() => this.focusOnListHeader(), 100);
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
    setTimeout(() => this.focusOnListHeader(), 100);
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
    this.currentPage = 1;
    this.updateQueryParams();
    this.applyFilters();
  }
  onRoleChange() {
    this.currentPage = 1;
    this.updateQueryParams();
    this.applyFilters();
  }
  onFavoritesToggle() {
    this.currentPage = 1;
    this.updateQueryParams();
    this.applyFilters();
  }
  onSortChange() {
    this.currentPage = 1;
    this.updateQueryParams();
    this.applyFilters();
  }

  private updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm || null,
        role: this.selectedRole !== "all" ? this.selectedRole : null,
        favorites: this.favoritesOnly ? "true" : null,
        sort: this.sortOption !== "name-asc" ? this.sortOption : null,
        page: this.currentPage > 1 ? this.currentPage : null,
      },
      queryParamsHandling: "merge",
    });
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
    this.updatePagination();
  }

  private updatePagination() {
    this.totalPages = Math.ceil(this.viewMonsters.length / this.pageSize);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = this.totalPages;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedMonsters = this.viewMonsters.slice(start, end);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateQueryParams();
    this.updatePagination();
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  @HostListener("window:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Ignore if user is typing in an input
    const target = event.target as HTMLElement;
    if (
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable
    ) {
      return;
    }

    const key = event.key.toLowerCase();
    switch (key) {
      case "n":
        event.preventDefault();
        this.onNewMonster();
        break;
      case "r":
        event.preventDefault();
        this.onRandomMonster();
        break;
      case "t":
        event.preventDefault();
        this.onCreateTeam();
        break;
      case "s":
        event.preventDefault();
        this.cycleSortOption();
        break;
      case "f":
        event.preventDefault();
        this.favoritesOnly = !this.favoritesOnly;
        this.onFavoritesToggle();
        break;
    }
  }

  private cycleSortOption() {
    const options: Array<"name-asc" | "name-desc" | "role-asc"> = [
      "name-asc",
      "name-desc",
      "role-asc",
    ];
    const currentIndex = options.indexOf(this.sortOption);
    this.sortOption = options[(currentIndex + 1) % options.length];
    this.onSortChange();
  }

  private focusOnListHeader() {
    if (this.listHeader && this.listHeader.nativeElement) {
      this.listHeader.nativeElement.focus();
    }
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

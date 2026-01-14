import { Monster } from "./monster.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import monstersData from "../../assets/monsters.json";
import { MatDialog } from "@angular/material/dialog";
import { DialogService } from "../shared/dialog.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class MonsterService {
  monstersChanged = new Subject<Monster[]>();
  // json:any = monsterData
  private monsterData = monstersData;

  private monsters: Monster[] = [
    new Monster("Vampire", "He just wants your blood.", true, "soldier"),

    new Monster(
      "Swamp Creature",
      "He awaits you in the swamp.",
      false,
      "medic"
    ),
  ];

  private STORAGE_KEY = "monster_list";

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private snackBar: MatSnackBar
  ) {
    this.loadFromStorage();
  }

  getMonsters() {
    return this.monsters.slice();
  }

  getMonster(index: number) {
    return this.monsters[index];
  }

  addMonster(monster: Monster) {
    this.monsters.push(monster);
    this.emitChange();
    this.openSnack("Monster added");
  }

  updateMonster(index: number, newMonster: Monster) {
    this.monsters[index] = newMonster;
    this.emitChange();
    this.openSnack("Monster updated");
  }

  deleteMonster(index: number) {
    this.dialogService
      .openConfirmDialog("Are you sure you want to delete this monster?")
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.monsters.splice(index, 1);
          this.emitChange();
          this.openSnack("Monster deleted");
        }
      });
  }

  toggleFavorite(index: number) {
    const m = this.monsters[index];
    if (!m) return;
    m.favorite = !m.favorite;
    this.emitChange();
    this.openSnack(m.favorite ? "Marked favorite" : "Unfavorited");
  }

  addRandomMonster() {
    // Try to avoid duplicates when possible
    let attempts = 10;
    let monster: Monster | null = null;
    while (attempts-- > 0) {
      const r = Math.floor(Math.random() * this.monsterData.length);
      const candidate = new Monster(
        this.monsterData[r].name,
        this.monsterData[r].desc,
        false,
        this.monsterData[r].role
      );
      if (!this.isNameTaken(candidate.name)) {
        monster = candidate;
        break;
      }
      monster = candidate; // fall back if all attempts hit duplicates
    }
    this.monsters.push(monster as Monster);
    this.emitChange();
    this.openSnack("Random monster added");
  }

  removeAll() {
    this.monsters = [];
    this.emitChange();
    localStorage.removeItem(this.STORAGE_KEY);
    this.openSnack("All monsters removed");
  }

  createRandomTeam() {
    // First clear the list
    this.monsters = [];
    this.monstersChanged.next(this.monsters.slice());

    // Now create the monsters
    const names = new Set<string>();
    while (this.monsters.length < 5) {
      const r = Math.floor(Math.random() * this.monsterData.length);
      const candidate = new Monster(
        this.monsterData[r].name,
        this.monsterData[r].desc,
        false,
        this.monsterData[r].role
      );
      if (!names.has(candidate.name)) {
        names.add(candidate.name);
        this.monsters.push(candidate);
      }
    }

    this.emitChange();
    this.openSnack("Random team created");
  }

  unfavoriteAll() {
    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].favorite = false;
    }

    this.emitChange();
    this.openSnack("All favorites cleared");
  }

  sortMonsters() {
    function dynamicSort(property) {
      var sortOrder = 1;
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        var result =
          a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }

    this.monsters.sort(dynamicSort("name"));
    this.emitChange();
  }

  setMonsters(monsters: Monster[]) {
    this.monsters = monsters || [];
    this.emitChange();
    this.openSnack("Monsters imported");
  }

  private isNameTaken(name: string): boolean {
    const n = (name || "").toLowerCase();
    return this.monsters.some((m) => (m.name || "").toLowerCase() === n);
  }

  private emitChange() {
    this.saveToStorage();
    this.monstersChanged.next(this.monsters.slice());
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.monsters));
    } catch (e) {
      // ignore storage errors
    }
  }

  private loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        // Basic validation of shape
        if (Array.isArray(arr)) {
          this.monsters = arr.map(
            (m) =>
              new Monster(m.name, m.description, !!m.favorite, m.role || "")
          );
          this.monstersChanged.next(this.monsters.slice());
        }
      }
    } catch (e) {
      // fall back silently
    }
  }

  private openSnack(message: string) {
    if (!this.snackBar) return;
    this.snackBar.open(message, undefined, { duration: 2000 });
  }
}

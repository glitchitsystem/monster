import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MonsterService } from "../monster.service";

@Component({
  selector: "app-monster-edit",
  templateUrl: "./monster-edit.component.html",
  styleUrls: ["./monster-edit.component.css"],
})
export class MonsterEditComponent implements OnInit {
  id: number;
  editMode = false;
  monsterForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private monsterService: MonsterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    });
  }

  private initForm() {
    let monsterName = "";
    let monsterDescription = "";
    let monsterFavorite = false;
    let monsterRole = "";

    if (this.editMode) {
      const monster = this.monsterService.getMonster(this.id);
      monsterName = monster.name;
      monsterDescription = monster.description;
      monsterFavorite = monster.favorite;
      monsterRole = monster.role;
    }

    this.monsterForm = new FormGroup({
      name: new FormControl(monsterName, [
        Validators.required,
        this.uniqueNameValidator.bind(this),
      ]),
      description: new FormControl(monsterDescription, Validators.required),
      favorite: new FormControl(monsterFavorite, Validators.required),
      role: new FormControl(monsterRole),
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.monsterService.updateMonster(this.id, this.monsterForm.value);
      console.log(this.monsterForm);
    } else {
      this.monsterService.addMonster(this.monsterForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private uniqueNameValidator(control: FormControl) {
    const name = (control.value || "").toString().trim().toLowerCase();
    if (!name) return null;
    const list = this.monsterService.getMonsters();
    const exists = list.some((m, idx) => {
      const mn = (m.name || "").toLowerCase();
      if (this.editMode && idx === this.id) return false;
      return mn === name;
    });
    return exists ? { duplicateName: true } : null;
  }
}

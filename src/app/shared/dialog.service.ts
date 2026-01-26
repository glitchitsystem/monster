import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PopUpComponent } from "../pop-up/pop-up.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(message: string = "Are you sure?") {
    return this.dialog.open(PopUpComponent, {
      width: "390px",
      disableClose: true,
      panelClass: "confirm-dialog-container",
      data: { message },
      autoFocus: true,
      restoreFocus: true,
    });
  }
}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog() {
    return this.dialog.open(PopUpComponent, {
      width: '390px',
      disableClose: true,
      panelClass: 'confirm-dialog-container'
    })
  }
}

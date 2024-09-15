import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal-order-created',
  standalone: true,
  imports: [MatIcon, MatDialogModule, MatButtonModule, MatButton],
  templateUrl: './modal-order-created.component.html',
  styleUrl: './modal-order-created.component.css'
})
export class ModalOrderCreatedComponent {

  constructor(public dialog: MatDialogRef<ModalOrderCreatedComponent>){}

  onClose(): void {
    this.dialog.close();
  }
}

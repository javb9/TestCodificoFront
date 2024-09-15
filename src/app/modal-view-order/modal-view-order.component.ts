import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-modal-view-order',
  standalone: true,
  imports: [MatButtonModule, 
    MatButton,
    MatTableModule, 
    MatTable,
    MatPaginatorModule, 
    MatPaginator,
    MatSortModule,
    MatSort,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatToolbar],
  templateUrl: './modal-view-order.component.html',
  styleUrl: './modal-view-order.component.css'
})
export class ModalViewOrderComponent{
  constructor(public dialogRef: MatDialogRef<ModalViewOrderComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  dataSourceOrders = new MatTableDataSource<any[]>();
  displayedColumnsOrders: string[] = ['orderId', 'requiredDate', 'shipName', 'shipaddress', 'shipcity', 'shippedDate'];

  @ViewChild(MatPaginator) paginatorOrders!: MatPaginator;
  @ViewChild(MatSort) sortOrders!: MatSort;

  ngOnInit(): void {
    this.dataSourceOrders.data = this.data.data.dataResult;
  }

  ngAfterViewInit(): void {
    this.dataSourceOrders.paginator = this.paginatorOrders;
    this.dataSourceOrders.sort = this.sortOrders;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSourceOrders.filter = filterValue;

    if (this.dataSourceOrders.paginator) {
      this.dataSourceOrders.paginator.firstPage();
    }
  }
}



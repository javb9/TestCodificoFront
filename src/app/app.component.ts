import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { MatButton, MatButtonModule } from '@angular/material/button'
import { MatTableModule, MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewOrderComponent } from './modal-view-order/modal-view-order.component'
import { ModalNewOrderComponent } from './modal-new-order/modal-new-order.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
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
    MatToolbar
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TecnicalTestFront';

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['customerName', 'lastOrderDate', 'nextPredicatedOrder', 'ViewOrders', 'newOrder'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.apiService.GetCustomersPredicatedDate().subscribe(
      response => {
        this.dataSource.data = response.dataResult;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onViewOrders(cusId: number) {
    this.apiService.GetClientOrders(cusId).subscribe(
      response => {
        this.dialog.open(ModalViewOrderComponent, {
          panelClass: 'custom-dialog-container', // Usa una clase personalizada para el panel
          data: { data: response, }
        });
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onNewOrder(cusId: any) {
    this.dialog.open(ModalNewOrderComponent, {
      panelClass: 'custom-dialog-container', // Usa una clase personalizada para el panel
      data: { custid: cusId, }
    });
  }

}

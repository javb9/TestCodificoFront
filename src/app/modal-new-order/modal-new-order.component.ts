import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { ApiService } from './../services/api.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatFormFieldModule, MatLabel, MatPrefix } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { ModalOrderCreatedComponent } from './../modal-order-created/modal-order-created.component'

@Component({
  selector: 'app-modal-new-order',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOptionModule,
    MatOption,
    MatToolbarModule,
    MatToolbar,
    ReactiveFormsModule,
    MatError,
    CommonModule,
    MatGridListModule,
    MatGridList,
    MatDatepickerModule,
    MatDatepicker,
    MatPrefix,
    MatDivider,
    MatButton,
    DatePipe
  ],
  templateUrl: './modal-new-order.component.html',
  styleUrl: './modal-new-order.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalNewOrderComponent {

  //#region data formulario
  orderDate!: Date;
  employees: any;
  shippers: any;
  products: any;
  //#endregion
  constructor(private ApiService: ApiService, public dialogRef: MatDialogRef<ModalNewOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public custid: any, private datePipe: DatePipe,public modalOrderCreatedRef: MatDialog) {
    this.form = new FormGroup({
      shipName: new FormControl('', [Validators.required]),
      Employee: new FormControl('', [Validators.required]),
      Shipper: new FormControl('', [Validators.required]),
      shipAddress: new FormControl('', [Validators.required]),
      shipCity: new FormControl('', [Validators.required]),
      shipCountry: new FormControl('', [Validators.required]),
      orderDate: new FormControl('', [Validators.required]),
      requiredDate: new FormControl('', [Validators.required]),
      shippedDate: new FormControl('', [Validators.required]),
      freight: new FormControl('', [Validators.required]),
      Product: new FormControl('', [Validators.required]),
      unitPrice: new FormControl('', [Validators.required]),
      Quantity: new FormControl('', [Validators.required]),
      Discount: new FormControl('', [Validators.required]),
    });
  }

  form: FormGroup;


  ngOnInit(): void {
    this.getDataForm();
  }

  getDataForm() {
    this.ApiService.GetEmployees().subscribe(
      response => {
        this.employees = response.dataResult;
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );

    this.ApiService.GetShippers().subscribe(
      response => {
        this.shippers = response.dataResult;
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );

    this.ApiService.GetProducts().subscribe(
      response => {
        this.products = response.dataResult;
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      var dataToSave = {
        "custid": this.custid.custid,
        "empid": parseInt(this.form.value.Employee),
        "orderdate": this.datePipe.transform(this.form.value.orderDate, 'yyyy-MM-dd'),
        "requireddate": this.datePipe.transform(this.form.value.requiredDate, 'yyyy-MM-dd'),
        "shippeddate": this.datePipe.transform(this.form.value.shippedDate, 'yyyy-MM-dd'),
        "shipperid": parseInt(this.form.value.Shipper),
        "freight": this.form.value.freight,
        "shipname": this.form.value.shipName,
        "shipaddress": this.form.value.shipAddress,
        "shipcity": this.form.value.shipCity,
        "shipcountry": this.form.value.shipCountry,
        "orderDetail": {
          "productid": parseInt(this.form.value.Product),
          "unitprice": this.form.value.unitPrice,
          "qty": this.form.value.Quantity,
          "discount": this.form.value.Discount
        }
      }

      this.ApiService.CreateOrder(dataToSave).subscribe(response => {
        if(response.message == "Order created succesfull"){
          console.log("se creo correctamente");
          this.dialogRef.close();  
          this.modalOrderCreatedRef.open(ModalOrderCreatedComponent)
        }
      },
        error => {
          console.error("Error al intentar guardar los datos: ", error)
        }
      )

    } else {
      this.form.markAllAsTouched();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

}

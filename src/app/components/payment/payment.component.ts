import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/Models/Payment';
import { NotificationService } from 'src/app/services/notification.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  tData:Payment[]=[];
  tableData:MatTableDataSource<any> =new MatTableDataSource();
  @ViewChild(MatSort) sort:MatSort=new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey:string='';

  constructor(private noticeService:NotificationService,private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.paymentService.getPayment().subscribe(res=>{
      this.tData = res;
      this.tableData=new MatTableDataSource(this.tData);
      this.tableData.sort=this.sort;
      this.tableData.paginator=this.paginator;
    },
    err=>{
      console.log(err);
    })
  }


  searchPayment(){
    this.paymentService.searchPayment(this.searchForm.value).subscribe(res=>{
      this.tData = res;
      this.tableData=new MatTableDataSource(this.tData);
      this.tableData.sort=this.sort;
      this.tableData.paginator=this.paginator;
    },
    err=>{
      console.log(err);
    })

  }
  searchForm=new FormGroup({
    Title:new FormControl('',Validators.required)
  });


  onSearchClear(){
    this.searchKey='';
    this.filter();
  }
  filter(){
    this.tableData.filter=this.searchKey.trim().toLowerCase();

  }
  applyFilter(event:Event){
    const filterValue= (event.target as HTMLInputElement).value;
    this.tableData.filter=filterValue.trim().toLowerCase();
  }

  setUpFilter(colName:any){
    this.tableData.filterPredicate = (data:string,filter:string)=>{
      const text = data[colName] && data[colName].toLowerCase()|| '';
      return text.indexOf(filter) !==-1;
    }
  }
  
  displayedColumns:string[]=['paymentModeId',
                              'paymentsMode',
                              'isActive',
                             ];


                             

 

}

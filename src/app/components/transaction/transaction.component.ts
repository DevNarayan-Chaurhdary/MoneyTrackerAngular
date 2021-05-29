import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryList } from 'src/app/Models/CategoryList';
import { Header } from 'src/app/Models/Header';
import { TransactionData } from 'src/app/Models/TrasactionData';
import { NotificationService } from 'src/app/services/notification.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { InputDialogComponent } from './input-dialog/input-dialog.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  tData:TransactionData[]=[];
  cList:CategoryList[]=[];
  header:Header = new Header();
  temp:MatTableDataSource<any> =new MatTableDataSource();
  tableData:MatTableDataSource<any> =new MatTableDataSource();
  @ViewChild(MatSort) sort:MatSort=new MatSort();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  expense:number=0;
  income:number=0;
  totalTxn:number=0;
  balance:number=0;
  isCalanderActive:boolean=true;
  public tTypeArray:string[]=[];
  categoryFilter:string='';
  // categoryVisitCount:number=0;

  constructor(private dialog :MatDialog,private txnService:TransactionService,private noticeService:NotificationService) { }

  ngOnInit(): void {
    this.getHeader();
    this.getCategoryList();
    this.getData();
  }

  getCategoryList(){
    this.txnService.getCList().subscribe(data=>{
      this.cList=data;
    },
    err=>{

    })

  }

  getHeader(){
    this.txnService.getHeader().subscribe(data=>{
      this.header=data;
      this.income= this.header.totalIncome;
      this.expense = this.header.totalExpense;
      this.totalTxn = this.header.totalTxn;
      this.balance = this.income-this.expense;
      
    },err=>{

    });

  }

  getData(){
    this.txnService.getTxnData().subscribe(res=>{
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
    Title:new FormControl('',Validators.required),
    Value:new FormControl('',Validators.required)
  });

  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null)
  });
  
  displayedColumns:string[]=['transactionId',
                              'category',
                              'tDate',
                              'pMode',
                              'description',
                              'amount',
                              'transactionType',
                              'actions'];

  openDialog(){

    this.dialog.open(InputDialogComponent,{
      data:{
        list:this.cList
      }
    });
  }

  update(data:any){
    
    // const dialogconfig = new MatDialogConfig();
    // dialogconfig.disableClose=true;
    // // dialogconfig.width="80%";
    // dialogconfig.autoFocus=false;
  
    this.dialog.open(InputDialogComponent,{
      data:{
        value:data,
        list:this.cList
      }
    });
  }

  delete(data:any){
    
       this.dialog.open(DeleteConfirmComponent,{
        width:'300px',
        panelClass: 'dialog-container',
        disableClose:true
      }).afterClosed().subscribe(
        res=>{
                if(res){
            this.txnService.deleteTxn(data).subscribe(
            ()=>{
              this.noticeService.failure('!!! Data is Deleted');
              window.location.reload();
            },
            ()=>{
              console.log("Unable to delete Job");
            }
          );
         
        }
          
        }
      );
  }

  searchTxn(){
    this.txnService.searchTxn(this.searchForm.value).subscribe(res=>{
      this.tData = res;
      this.tableData=new MatTableDataSource(this.tData);
      this.tableData.sort=this.sort;
      this.tableData.paginator=this.paginator;
    },
    err=>{
      console.log(err);
    })

  }

  applyFilter(filterValue:any){

    var temp=[];
    // const filterValue= (event.target as HTMLInputElement).value;
    this.tableData.filter=filterValue.trim().toLowerCase();
  }

  setUpFilter(colName:any){
    this.tableData.filterPredicate = (data:string,filter:string)=>{
      const text = data[colName] && data[colName].toLowerCase()|| '';
      return text.indexOf(filter) !==-1;
    }
  }

  change(event:boolean){
    this.isCalanderActive=!event;
  }

  applyDateRangeFilter(){
    if(this.range.valid){
    // console.log("inside filter");
    // console.log(this.tableData.data);
    // console.log(this.range.value);
    // this.tableData.data= this.tableData.data.filter(e=>e.category == 'Food');
    this.tableData.data= this.tableData.data.filter(e=>Date.parse(e.tDate) >= this.range.get('start')?.value);
     this.tableData.data= this.tableData.data.filter(e=> Date.parse(e.tDate) <= this.range.get('end')?.value);
    // console.log(this.tableData.data);
    }

  }

  refresh(){
    this.range.get('start')?.setValue(null);
    this.range.get('end')?.setValue(null);
    // this.categoryVisitCount=0;
    this.getData();
  }
  
  filterSixMonthLater(event :boolean){
    if(event){
      var date:string;
      var d = new Date();
      d.setMonth(d.getMonth()-6);
      // date= JSON.stringify(d);
      var dat=formatDate(d,'yyyy-MM-dd','en_US');
      // console.log(dat);
      this.tableData.data= this.tableData.data.filter(e=> formatDate(e.tDate,'yyyy-MM-dd','en_US') >= dat);
  
    }
    else{
      this.getData();
    }

  }

  prepareFilter(e:boolean,data:string){
    if(e){
      this.tTypeArray.push(data);
    }
    else{
      this.tTypeArray.splice(this.tTypeArray.indexOf(data),1);
    }

    // console.log(JSON.stringify(this.tTypeArray).trim().toLowerCase());
    this.tTypeArray.forEach(data=>{
      console.log(e);
      this.tableData.data= this.tableData.data.filter(d=>d.transactionType == data);
     
    })
 
 
    // this.tableData.filter="co";

  }

  filterCategory(){
    // if(this.categoryVisitCount>0){
    //   this.refresh();
    // }

    console.log(this.categoryFilter);
    this.tableData.data= this.tableData.data.filter(e=>e.category == this.categoryFilter);
    // this.categoryVisitCount++;

  }

}

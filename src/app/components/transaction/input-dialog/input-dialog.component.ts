import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryList } from 'src/app/Models/CategoryList';
import { TransactionService } from 'src/app/services/transaction.service';
import { environment } from 'src/environments/environment';

const URL = environment.Base_URL;

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  header:string="New Transaction";
  action:string="Save";
  txnId:number=0;
  cList:CategoryList[]=[];

  

  constructor(private http:HttpClient,@Inject (MAT_DIALOG_DATA) public data:any,public dialogRef:MatDialogRef<InputDialogComponent>,
  private txnService:TransactionService) { }

  ngOnInit(): void {
    this.cList = this.data.list;
    if(this.data.value){
      this.action="Update";
      this.header="Update Transaction"
      this.txnId = this.data.value.transactionId;
      this.TxnForm.get('TransactionType')?.setValue(this.data.value.transactionType);
      this.TxnForm.get('TxnDate')?.setValue(this.data.value.tDate);
      this.TxnForm.get('Category')?.setValue(this.data.value.category);
      this.TxnForm.get('Amount')?.setValue(this.data.value.amount);
      this.TxnForm.get('Description')?.setValue(this.data.value.description);
      this.TxnForm.get('PaymentMode')?.setValue(this.data.value.pMode);
      
      // console.log(this.data);
      
    }

  }

  TxnForm = new FormGroup({
    TransactionType:new FormControl('',Validators.required),
    TxnDate:new FormControl(null,Validators.required),
    Category:new FormControl('',Validators.required),
    Amount:new FormControl('',Validators.required),
    Description:new FormControl(''),
    PaymentMode:new FormControl('',Validators.required),
    IsActive:new FormControl(true)
  });

  saveTxn(){
    if(this.action=='Save'){
      this.txnService.saveTxn(this.TxnForm.value).subscribe(res=>{
        // alert(res);
        window.location.reload();
      },res=>{
        console.log(res);
      });
      
    }
    else{
      if(this.txnId>0){
        this.txnService.updateTxn(this.TxnForm.value,this.txnId).subscribe(res=>{
          window.location.reload();
        },res=>{
          console.log(res);
        })
      }

    }
 
  }

  onCancel(){
    this.dialogRef.close();
  }

}

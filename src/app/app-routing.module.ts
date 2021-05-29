import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { InputDialogComponent } from './components/transaction/input-dialog/input-dialog.component';
import { PaymentComponent } from './components/payment/payment.component';
import { TransactionComponent } from './components/transaction/transaction.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"input",component:InputDialogComponent},
  {path:"transaction",loadChildren:()=> import('./components/transaction/txn.module')
        .then(m=>m.TxnModule)},
  {path:"category",component:CategoryComponent},
  {path:"payment",component:PaymentComponent},
  {path:"home",component:HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

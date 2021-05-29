import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  config:MatSnackBarConfig={
    duration:3000,
    horizontalPosition:'center',
    verticalPosition:'top'
  }

  constructor(public snackBar:MatSnackBar) { }

  success(message:string){
    this.config['panelClass']=['notification','success'];
    this.snackBar.open(message,'',this.config);
  }
  failure(message:string){
    this.config['panelClass']=['notification','fail'];
    this.snackBar.open(message,'',this.config);
  }

 
}

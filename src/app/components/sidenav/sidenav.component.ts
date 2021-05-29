import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToTxn(){
    this.router.navigate(["/transaction"]);
  }
  goToCategory(){
    this.router.navigate(["/category"]);
  }
  goToPaymentMode(){
    this.router.navigate(["/payment"]);
  }


}

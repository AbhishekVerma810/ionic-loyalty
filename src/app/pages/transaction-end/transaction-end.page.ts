import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-end',
  templateUrl: './transaction-end.page.html',
  styleUrls: ['./transaction-end.page.scss'],
})
export class TransactionEndPage implements OnInit {

  constructor(private router:Router) {
     setTimeout(()=>{
      this.router.navigate(['/login'])
      localStorage.removeItem('user_data');
     },2000)
   }
   ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.page.html',
  styleUrls: ['./welcome-screen.page.scss'],
})
export class WelcomeScreenPage implements OnInit {

  constructor(private router:Router) { 
    setTimeout(()=>{
        this.router.navigate(['/customer-interface']);
    },4000)
  }

  ngOnInit() {
  }

}

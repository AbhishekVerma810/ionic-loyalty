import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  business_data="business_data";
  userdata="user_data";
  businessData: any;
  constructor(private apiService:ApiService,private router:Router) {
    const storedData =this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
    if(this.businessData){
      const storedData =this.apiService.getLocalStorageData(this.userdata);
       console.log('this.businessData======>',this.businessData.data.theme_color)
       const darkColor=this.ColorLuminance(this.businessData.data.theme_color,-0.5)
       const themeWrapper = document.querySelector('body');
       document.documentElement.style.setProperty('--secondary-color', darkColor || '#00308F');
       document.documentElement.style.setProperty('--primary-color', this.businessData.data?.theme_color || '#00308F');
      if(storedData){
        this.router.navigate(['/customer-interface'])
      }else{
        this.router.navigate(['/code-screen'])
      }
    }else{
      this.router.navigate(['/business-id-page'])
    }
  }
  ColorLuminance(hex, lum) {
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
    return rgb;
  }
}



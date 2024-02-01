import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { constantKeys } from 'src/constant/constant';
@Component({
  selector: 'app-business-id-page',
  templateUrl: './business-id-page.page.html',
  styleUrls: ['./business-id-page.page.scss'],
})
export class BusinessIdPagePage implements OnInit {
  businessId: string = '';
  constructor(private router: Router, private apiService: ApiService, private loader: LoaderService,
    private message: MessageService,
    private storageservice: StorageService,
  ) { }

  ngOnInit() {
  }
  addToBusinessId(value: any) {
    this.businessId += value;
  }
  removeLastDigit() {
    this.businessId = this.businessId.slice(0, -1);
  }
  submitBusinessId() {
    if (!this.businessId) {
      this.message.presentToast('Enter Business Id', 'danger');
      return;
    }
    const data = {
      business_id: this.businessId
    }
    console.log('Business ID submitted:', this.businessId);
    try {
      this.apiService.getBusinessId(data).subscribe((res:any) => {
        console.log('business_data', res)
        // let storageinfo = JSON.stringify(res.data);
        this.storageservice.set(constantKeys.businessInfo,JSON.stringify(res.data))
        localStorage.setItem('business_data', JSON.stringify(res));
        this.router.navigate(['/code-screen']);
        this.businessId = " ";
      }, (error) => {
        this.message.presentToast('Something went wrong', 'danger');
       })
    } catch (err) {
      console.log('we getting some error');
    }
   }
}

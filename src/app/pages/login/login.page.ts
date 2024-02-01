import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { constantKeys } from 'src/constant/constant';
import{io} from "socket.io-client";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  number: string = '';
  businessData: any;
  business_data = "business_data";
  private socket: any;
  organization_id: string='';
  Connectioninfo:any;
  constructor(private router: Router, private apiService: ApiService,
    private loader: LoaderService,
    private message: MessageService,
    private storageservice: StorageService,
    private activeroute:ActivatedRoute
    ) {
    const storedData = this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
     this.organization_id=this.businessData.data.id;
     this.socket =io(environment.socketurl);
  }

  ngOnInit() {
    this.getConnectionInfo();
  }
  ionViewWillEnter() {
    this.activeroute.url.subscribe(url => {
      console.log('Navigated to page from route:', url);
      // this.ngOnInit();
      this.number=''
    });
  }
  navigatewellcome() {
    this.router.navigate(['/welcome-screen'])
  }
  addToBusinessId(value: any) {
    this.number += value;
  }
  removeLastDigit() {
    this.number = this.number.slice(0, -1);
  }
  submit() {
    const data = {
      contact_number: this.number,
      // organization_id: this.organization_id.toString()
       organization_id:this.organization_id.toString()
    }
    console.log('Business ID submitted:', this.number);
    try {
      this.apiService.login(data).subscribe((res: any) => {
        console.log('ressssss=>', res)
        if (res.data.userType=='NEW') {
          this.router.navigate(['/signup'],{ queryParams: { number: this.number } });
        } else {
          this.message.presentToast(res.message, 'success');
          console.log('login res',res)
          let userinfo = JSON.stringify(res.data)
          this.storageservice.set(constantKeys.userinfo,userinfo);
          let info={
            bussnessId:this.Connectioninfo.code,
            userId:`${res && res.data.customerDetails ? res.data.customerDetails.id :''}`,
          }
          this.socket.emit('sendBussnessResponse',info);
          localStorage.setItem('user_data', JSON.stringify(res));
          this.router.navigate(['/welcome-screen'])
        }
       },
        (error) => {
          if (error.status === 401) {
            this.message.presentToast('Email or Password Incorrect', 'danger');

          } else {
            this.router.navigate(['/signup'],{ queryParams: { number: this.number } });
 
           }
        }
      )
    }
    catch (err) {
      console.log('we getting some error');
    }
  }
  getConnectionInfo()
  {
    this.storageservice.get(constantKeys.connectioninfo).then(data => {
      if (data) {
        console.log('data',data)
        let info = JSON.parse(data);
        this.Connectioninfo=info
        console.log('connectioninfo--',info);
      }
    })
  }
}



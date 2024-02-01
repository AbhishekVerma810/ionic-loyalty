import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Swiper } from 'swiper';
import{io} from "socket.io-client"
import { StorageService } from 'src/app/services/storage.service';
import { constantKeys } from 'src/constant/constant';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-customer-interface',
  templateUrl: './customer-interface.page.html',
  styleUrls: ['./customer-interface.page.scss'],
})
export class CustomerInterfacePage implements OnInit {
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  userData: any;
  user_data="user_data"
  private socket: any;
  public message: string = '';
  bussnessId:any="";
  selectedOffer:any;
  connectioninfo:any;
  businessInfo:any
  userinfo:any
  rewardinfo:any
  loyaltypoints:number
  constructor(private router:Router,
    private apiService:ApiService,
    private storageservice:StorageService,
    private activeroute:ActivatedRoute,
    ) {
    const storedData=this.apiService.getLocalStorageData(this.user_data);
    this.userData = JSON.parse(storedData);
    console.log(this.userData)
     //  this.getAndSaveId();
     this.socket =io(environment.socketurl);

     this.socket.on(this.bussnessId, (message:any) => {
       console.log(`Received broadcast: ${message.message}`);
     });
     this.socket.on(`instruction_${this.bussnessId}`, (message:any) => {
       console.log(`instruction_......: ${message}`);
     });
     this.socket.on(`jk47`, (message:any) => {
       console.log(`jk47......: ${message}`);
     });
     this.socket.on(`response-${this.bussnessId}`, (message:any) => {
       console.log(`message: ${message}`);
     });
     this.socket.on(`receive_Bussness_Response_${this.bussnessId}`, (message:any) => {
       console.log(`receive_Bussness_Response_: ${message}`);
     });
     this.socket.emit('7890', '7890');
     this.socket.emit('sendBussnessId', this.bussnessId);
    }
    ngOnInit() {
     this.getStorageinfo('businessInfo');
     this.getStorageinfo('connectioninfo');
     this.getStorageinfo('userinfo');
   }
   ionViewWillEnter() {
    this.activeroute.url.subscribe(url => {
      console.log('Navigated to page from route:', url);
      this.ngOnInit();
    });
  }
   navigatewellcome(){
     this.router.navigate(['/welcome-screen'])    
  }
  sendMessage() {
   // Send a message to the Node.js server
   this.socket.emit('ionic-message', this.message);
   this.message = ''; // Clear the input field
 }
 selectOffer(i:any)
 {
   console.log("selected offer id",i)
   this.selectedOffer=i.id;
   console.log("sendBussnessResponse call...")
   let info={
     bussnessId:this.bussnessId,
     item:i.id,
     userId:`${this.userinfo && this.userinfo.customerDetails ? this.userinfo.customerDetails.id :''}`,
   }
   this.socket.emit('sendBussnessResponse',info);
   this.socket.on(`instruction_${this.bussnessId}`, (res:any) => {
    console.log(`instruction_......: ${res}`);
    if(res.cashierLogout)
    {
      console.log('res.cashierLogout',res.cashierLogout)
      this.deleteExample(constantKeys.connectioninfo);
      this.deleteExample(constantKeys.userinfo);
      this.router.navigate(['/code-screen']);
    }
    if(res && res.endtransaction && !res.cashierLogout)
    {
      console.log('res.endtransaction',res.endtransaction)
      this.router.navigateByUrl('/transaction-end');
    }
    // Get loyalty points according to the enter amonut 
    if(res && res.loyaltypoints)
    {
      this.loyaltypoints=res.loyaltypoints
    }
    if(res && res.resetselection)
    {
      this.selectedOffer=''
    }
  });
 }
 deleteExample(keyToDelete:any) {
  // const keyToDelete = 'yourKey';
  this.storageservice.deleteItem(keyToDelete)
    .then(() => {
      console.log(`Item with key ${keyToDelete} deleted successfully.`);
    })
    .catch(error => {
      console.error(`Error deleting item with key ${keyToDelete}:`, error);
    });
  }
 getStorageinfo(key:any){
   console.log('key',`${key && key === constantKeys.connectioninfo ? constantKeys.connectioninfo : key === constantKeys.userinfo ? constantKeys.userinfo : constantKeys.businessInfo}`);
  
   this.storageservice.get(`${key && key === constantKeys.connectioninfo ? constantKeys.connectioninfo : key === constantKeys.userinfo ? constantKeys.userinfo : constantKeys.businessInfo}`).then(data => {
     if(data)
     {
       let info = JSON.parse(data);
       if(info)
       {
         if(key==constantKeys.connectioninfo)
         {
           this.connectioninfo=info
           this.bussnessId=info.code;
           console.log(constantKeys.connectioninfo,this.connectioninfo);
         }else if(key==constantKeys.businessInfo){      
           this.businessInfo=info
           this.getRewardFun(this.businessInfo.id);
           console.log(constantKeys.businessInfo,this.businessInfo)
         }else if(key==constantKeys.userinfo)
         {
           this.userinfo=info
           console.log(`${key && key === constantKeys.connectioninfo ? constantKeys.connectioninfo : key === constantKeys.userinfo ? constantKeys.userinfo : constantKeys.businessInfo}`);
           console.log(constantKeys.userinfo,this.userinfo)
         }
         // this.router.navigate(['/code-screen']);
         console.log('TRUE')  
       }else{
         console.log('FALSE')
       }
     }
  });
 }
 NotNowFun()
 {
  console.log('NOT NOW')
  localStorage.removeItem('user_data');
  let info={
    bussnessId:this.bussnessId,
    item:0,
    userId:`${this.userinfo && this.userinfo.customerDetails ? this.userinfo.customerDetails.id :''}`,
    endtransaction:true
  }
  this.socket.emit('sendBussnessResponse',info);
  this.router.navigateByUrl('/transaction-end')
 }
 getRewardFun(id:any)
 {
  let data ={
    'organization_id':id
  }
  this.apiService.getReward(data).subscribe((reward:any)=>{
    if(reward && reward.data)
    {
      console.log('reward',reward);
      this.rewardinfo=reward.data;
    }else{
      console.log('NO DATA FOUND FOR REWARD')
    }
  },(error=>{
    console.log('error',error);
  }))
 }

 redeemRewardFun()
 {
  return
  console.log('selectedOffer',this.selectedOffer);
  let input={
    "reward_id":this.selectedOffer,
    "customer_id":this.userinfo.customerDetails.id
   }
  this.apiService.redeemReward(input).subscribe((redeem:any)=>{
    console.log('redeem',redeem); //jk47
    let info={
      bussnessId:this.bussnessId,
      item:this.selectedOffer,
      userId:`${this.userinfo && this.userinfo.customerDetails ? this.userinfo.customerDetails.id :''}`,
      
    }
    this.socket.emit('sendBussnessResponse',info);
    this.updateuserinfo();
  },(error)=>{
    console.log('error',error)
  })
  // this.router.navigateByUrl('/transaction-end');
 }
 updateuserinfo()
 {
  let data={
    userId:this.userinfo.customerDetails.id.toString()
  }
  this.apiService.getuserinfo(data).subscribe((userinfo:any)=>{
    console.log('userinfo',userinfo)
    if(userinfo && userinfo.data)
    {
      this.userinfo.customerDetails.total_loyalty_point=userinfo.data.total_loyalty_point;
      this.storageservice.set(constantKeys.userinfo,this.userinfo);
    }
  },(error=>{
    console.log('error',error)
  }))
 }
 }
 
  
  // ngOnInit() {
  // }
 


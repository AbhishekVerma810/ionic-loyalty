import { Component, OnInit ,OnDestroy} from '@angular/core';
 import { StorageService } from 'src/app/services/storage.service';
import { constantKeys } from 'src/constant/constant';
import { io } from "socket.io-client"
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-code-screen',
  templateUrl: './code-screen.page.html',
  styleUrls: ['./code-screen.page.scss'],
})
export class CodeScreenPage implements OnInit,OnDestroy {
  businessDataObject: any;
  businessinfo: any;
  intervalId: any;
  private socket: any;
  randomNumbers: number[] = [];
  arraySize: number = 5;
  unique: any
  Connectioninfo: any;
  connectionStatus=false;
  constructor(
    private storageservice: StorageService,
    private router: Router
  ) {
    const storedData = localStorage.getItem('business_data');
    this.businessDataObject = JSON.parse(storedData);
    console.log('this.businessDataObject===>', this.businessDataObject)
    this.socket =io(environment.socketurl);
    this.socket.on(this.unique, (message: any) => {
      console.log(`Received broadcast: ${message.message}`);
    });
    // check start 
    let key = 'connection_ready_' + this.unique
    this.socket.on(`connection_ready_${this.unique}`, (message: any) => {
      console.log(`connection_ready_ message: ${message}`);
    });
    // this.socket.emit('sendBussnessId', this.unique);
    // check end 
  }

  async ngOnInit() {
    await this.getConnectionInfo();
    this.randomCreate();
    this.getStorageinfo();
    this.intervalId = setInterval(() => {
      if(!this.connectionStatus)
      {
        this.randomNumbers=[];
        console.log('connection Status',this.connectionStatus,'Calling methods again');
        this.randomCreate();
        this.getStorageinfo(); // Replace with the actual method you want to call
      }
    }, 10000); // 10000 milliseconds = 10 seconds
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  getStorageinfo() {

    this.storageservice.get(constantKeys.businessInfo).then(data => {
      if (data) {
        console.log('data',data)
        let info = JSON.parse(data);
        console.log('info',info)
        if (info) {
          this.businessinfo = info;
          console.log("businessinfo", this.businessinfo)
          console.log('info', info)
          let details = {
            bussnessId: this.businessinfo.business_id,
            unique: this.unique,
            org_id: info.id
          }
          console.log('start_connection...')
          if(this.Connectioninfo && this.Connectioninfo.status=="1")
          {
            console.log('Connection info found...........')
            this.router.navigate(['/login']);  //jkuse
            this.socket.emit('start_connection', details);
          }else{
            console.log('Connection info NOT Found start connection with code...........')
            this.socket.emit('start_connection', details);
          }
          // check start 
          this.socket.on(`receive_Bussness_Response${this.unique}`, (res: any) => {
            if (res) {
              let info = res
              if (info && info.status == 1) {
                console.log('Connection successfully', info)
                console.log('info.data', info)
                info = JSON.stringify(info);
                this.storageservice.set(constantKeys.connectioninfo, info);
                this.router.navigate(['/login']);
              }
              if(info && info.status=='0' && info.reset)
              {
                console.log('info.ms',info.ms)
                //delete the connection info-
                this.deleteExample(constantKeys.connectioninfo);
                this.router.navigate(['/code-screen']);
              }
            }
          });
          this.socket.on(`connection_ready_${this.unique}`, (message: any) => {
              if (message) {
                if(message && message.conection)
                {
                  this.connectionStatus=true;
                  console.log('Confim the connection with connection id......')
                  let info = message;
                  this.Connectioninfo = message;
                  console.log("Connectioninfo", this.Connectioninfo,'connection ms ',message.ms);
                }else{
                  console.log('connection FALSE,connection ms',message.ms)
                  this.connectionStatus=false;
                }
              }
          });
          // this.router.navigate(['/code-screen']);
          console.log('TRUE')
        } else {
          console.log('business info not found')
          this.router.navigate(['/business-id-page']);
          console.log('FALSE')
        }
      }else{
        this.router.navigate(['/business-id-page']);
        console.log('data not found')
      }

    });
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
  randomCreate() {
    for (let i = 0; i < 4; i++) {
      this.arraySize = Math.floor(Math.random() * 10);
      this.randomNumbers.push(this.arraySize);
      console.log(this.arraySize);
    }
    console.log(this.randomNumbers)
    const resultWithoutHyphens = this.randomNumbers.join('');
    console.log("String without hyphens:", resultWithoutHyphens);
    this.unique = resultWithoutHyphens;
  }
}




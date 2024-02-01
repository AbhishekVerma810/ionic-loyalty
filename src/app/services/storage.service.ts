import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { constantKeys } from 'src/constant/constant';
constantKeys
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage,) { 
    this.initStorage();
  }
  set(key: string, value: any) {
    this.storage.set(key, value);
  }

  get(key: string): Promise<any> {
    return this.storage.get(key);
  }
  
  deleteItem(key: string): Promise<any> {
    return this.storage.remove(key);
  }
  
  initStorage() {
    // Initialize the storage before using it
    this.storage.create()
      .then(() => {
        console.log('Storage initialized successfully');
        // Now you can set or get values
      })
      .catch((error) => {
        console.error('Error initializing storage', error);
      });
    }
    getStorageinfo(key:any){

      this.get(key).then(data => {
        if(data)
        {
          let info = JSON.parse(data);
          if(info)
          {
            console.log('info',info)
            console.log('TRUE')
           return info
          }else{
            console.log('FALSE')
           return null
          }
        }
       });
    }
}

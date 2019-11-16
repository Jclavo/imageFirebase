import { Injectable } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

import { ImageModel } from '../../models/image.model';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root'
})
export class ImageStoreService {

  constructor(private fireStorage: AngularFireStorage,
    private imageService: ImageService) { }

  save(imageFile: File) {

    // Saving the image
    // const task = this.fireStorage.upload("images/" + imageFile.name, imageFile);
    //let imageRandomName = Math.random().toString(20) + '.' + imageFile.name.split('.').pop();;
    let imageRandomName = Math.random().toString(20);

    const task = this.fireStorage.ref("images").child(imageRandomName).put(imageFile);

    task.percentageChanges().subscribe(per => {
      console.log(per);
    },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        this.fireStorage.ref("images").child(imageRandomName).getDownloadURL().subscribe(path => {
          console.log(path);
          this.saveReference(imageRandomName,path);
        });
      });

  }

  saveReference(imageName:string, path:string)
  {
    this.imageService.save(new ImageModel(null,imageName,path)).then(() => {
      console.log('Image reference added');
    }, err => {
      console.log('There was a problem adding.....');
    });
  }

  delete(id:string, name: string)
  {
    this.fireStorage.ref("images").child(name).delete().subscribe(result => {
      console.log(result);
      this.imageService.delete(id);
      //this.saveReference(imageRandomName,path);
    }, err => {
      console.log('There was a problem adding.....');
    });
  }
}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { ImageService } from '../../services/firebase/image.service';
import { ImageStoreService } from '../../services/firebase/image-store.service';
import { ImageModel } from '../../models/image.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.page.html',
  styleUrls: ['./image-gallery.page.scss'],
})
export class ImageGalleryPage implements OnInit {

  @ViewChild('inputcamera', { static: false }) cameraInput: ElementRef;

  private images: Array<ImageModel> = [];

  constructor(private imageService: ImageService,
    private imageStoreService: ImageStoreService) { }

  ngOnInit() {
    //this.imageStoreService.getAll();
    this.getImages();
  }

  ionViewDidEnter() {

    let imageFile: any;

    const element = this.cameraInput.nativeElement as HTMLInputElement;

    element.onchange = () => {

      // Depois colocar um loading aqui!!!     
      const reader = new FileReader();

      reader.onload = (r: any) => {

        let base64 = r.target.result as string;

        //this.images.push(new ImageModel(base64,imageFile));

      };

      //console.log('imagem: ', element.files[0]);
      reader.readAsDataURL(element.files[0]);
      imageFile = element.files[0];
      this.imageStoreService.save(imageFile);
    };
  }


  selectPicture() {
    console.log('oliii');
    const element = this.cameraInput.nativeElement as HTMLInputElement;
    element.click();
  }

  getImages() {
    this.imageService.getAll().subscribe(dataImage => {
      this.images = dataImage;
    });
  }

  delete(id: string, name: string)
  {
    this.imageStoreService.delete(id,name);
  }

}

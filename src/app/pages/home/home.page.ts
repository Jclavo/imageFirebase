import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ImageGalleryPage  } from '../image-gallery/image-gallery.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public modalController: ModalController) {}

  async openGallery()
  {
    const modal = await this.modalController.create({
      component: ImageGalleryPage,
      backdropDismiss: true
      
      // componentProps: {
      //   'title': 'Comments',
      //   'linesInput': this.item.comments
      // }
    } );

    await modal.present();
  }

}

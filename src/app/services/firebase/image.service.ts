import { Injectable } from '@angular/core';

import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

import { ImageModel } from '../../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private COLLECTION_NAME_IMAGES: string = '/images'

  private resultRAW: any;
  private resultObservable: Observable<ImageModel[]>;

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<ImageModel[]> {

    return this.afs.collection(this.COLLECTION_NAME_IMAGES).snapshotChanges()
      .pipe(map(res => {

        this.resultRAW = res;

        return this.resultObservable = this.resultRAW.map(itemData => {
          
          return new ImageModel(
            itemData.payload.doc.id,
            itemData.payload.doc.data().name,
            itemData.payload.doc.data().path
          );

         });
      }));
  }

  save(item: ImageModel): Promise<DocumentReference> {

    return this.afs.collection(this.COLLECTION_NAME_IMAGES).add({
      //id:item.id,
      name:item.name,
      path:item.path,
    });
  }

  delete(id: string): Promise<void>
  {
    return this.afs.collection(this.COLLECTION_NAME_IMAGES).doc(id).delete();
  }
}

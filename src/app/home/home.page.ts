import { Component } from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {CocktailApiService} from '../cocktail-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    cocktails: any;

    constructor(public api: CocktailApiService, public loadingController: LoadingController) {
        this.getCocktails();
    }

    async getCocktails() {
      const loading = await this.loadingController.create({
        message: 'Loading'
          });
          await loading.present();
          await this.api.getCocktail()
            .subscribe(res => {
              console.log(res);
              this.cocktails = res;
              loading.dismiss();
            }, err => {
              console.log(err);
              loading.dismiss();
            });
    }
}

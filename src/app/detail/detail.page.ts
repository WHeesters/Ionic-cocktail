import {Component, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {CocktailApiService} from '../cocktail-api.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.page.html',
    styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

    cocktail: any = {};
    ingredients: any = [];
    random = false;

    constructor(public api: CocktailApiService,
                public loadingController: LoadingController,
                public route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
        if (!this.route.snapshot.paramMap.get('id')) {
            this.random = true;
        }
        this.getCocktail();
    }

    doRefresh() {
        this.random = true;
        this.getCocktail();
    }

    async getCocktail() {
        const loading = await this.loadingController.create({
            message: 'Loading'
        });
        await loading.present();
        if (!this.random) {
            await this.api.getCocktailById(this.route.snapshot.paramMap.get('id'))
                .subscribe(res => {
                    this.cocktail = res.drinks[0];
                    this.setIngredients();
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        } else {
            await this.api.getRandCocktail()
                .subscribe(res => {
                    this.cocktail = res.drinks[0];
                    this.setIngredients();
                    loading.dismiss();
                }, err => {
                    console.log(err);
                    loading.dismiss();
                });
        }
    }

    setIngredients() {
        let num = 1;
        while (num <= 15) {
            const current_ingredient = this.cocktail['strIngredient' + num];
            const current_measure = this.cocktail['strMeasure' + num];
            if (current_ingredient) {
                this.ingredients.push(
                    {
                        'ingredient': current_ingredient,
                        'measure': current_measure
                    }
                );
            }
            num++;
        }
    }
}

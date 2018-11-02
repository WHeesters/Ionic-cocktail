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
        this.ingredients = [
            {
                'ingredient': this.cocktail.strIngredient1,
                'measure': this.cocktail.strMeasure1
            },
            {
                'ingredient': this.cocktail.strIngredient2,
                'measure': this.cocktail.strMeasure2
            },
            {
                'ingredient': this.cocktail.strIngredient3,
                'measure': this.cocktail.strMeasure3
            },
            {
                'ingredient': this.cocktail.strIngredient4,
                'measure': this.cocktail.strMeasure4
            },
            {
                'ingredient': this.cocktail.strIngredient5,
                'measure': this.cocktail.strMeasure5
            },
            {
                'ingredient': this.cocktail.strIngredient6,
                'measure': this.cocktail.strMeasure6
            },
            {
                'ingredient': this.cocktail.strIngredient7,
                'measure': this.cocktail.strMeasure7
            },
            {
                'ingredient': this.cocktail.strIngredient8,
                'measure': this.cocktail.strMeasure8
            },
            {
                'ingredient': this.cocktail.strIngredient9,
                'measure': this.cocktail.strMeasure9
            },
            {
                'ingredient': this.cocktail.strIngredient10,
                'measure': this.cocktail.strMeasure10
            },
            {
                'ingredient': this.cocktail.strIngredient11,
                'measure': this.cocktail.strMeasure11
            },
            {
                'ingredient': this.cocktail.strIngredient12,
                'measure': this.cocktail.strMeasure12
            },
            {
                'ingredient': this.cocktail.strIngredient13,
                'measure': this.cocktail.strMeasure13
            },
            {
                'ingredient': this.cocktail.strIngredient14,
                'measure': this.cocktail.strMeasure14
            },
            {
                'ingredient': this.cocktail.strIngredient15,
                'measure': this.cocktail.strMeasure15
            }
        ];
    }

}

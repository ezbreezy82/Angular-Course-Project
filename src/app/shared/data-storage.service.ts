import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
    private baseURL: string = 'https://ng-recipe-book-9fafe.firebaseio.com/'

    constructor(private http: Http, private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put(this.baseURL + 'recipes.json', this.recipeService.getRecipes());
    }

    fetchRecipes() {
        return this.http.get(this.baseURL + 'recipes.json')
            .map(
                (response: Response) => {
                    const recipes: Recipe[] = response.json();
                    for (let recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return recipes;
                }
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
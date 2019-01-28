import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {
    baseURL: string = 'https://ng-recipe-book-9fafe.firebaseio.com/'

    constructor(private http: Http,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    storeRecipes() {
        const token = this.authService.getToken();
        return this.http.put(this.baseURL + 'recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();
        return this.http.get(this.baseURL + 'recipes.json?auth=' + token)
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
            );
    }

    deleteRecipe(recipe: Recipe) {
        return this.http.get(this.baseURL + 'recipes/name/' + recipe.name);
    }
}
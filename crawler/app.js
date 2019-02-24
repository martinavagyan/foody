"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
const jsdom_1 = require("jsdom");
class Crawler {
    constructor() {
    }
    recipeConstructor() {
        return __awaiter(this, void 0, void 0, function* () {
            const recipeUrl = 'https://tasty.co/recipe/one-pan-fall-chicken-dinner';
            const sourceRecipe = yield this.getJsonRecipes(recipeUrl);
            const targetRecipe = this.transformRecipe(sourceRecipe);
            console.log(targetRecipe);
        });
    }
    /**
     * Given @param url, get the recipe data in json format
     * */
    getJsonRecipes(recipeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const tatsy_url = recipeUrl;
            var options = { uri: tatsy_url };
            const result = yield request.get(options);
            const recipeDataSelector = "script[type='application/ld+json']";
            const recipeData = this.htmlToJsonConverter(result, recipeDataSelector);
            return recipeData;
        });
    }
    /**
     * Convert string html to
     */
    htmlToJsonConverter(html, selectorName) {
        let dom = new jsdom_1.JSDOM(html);
        const sourceData = dom.window.document.querySelectorAll(selectorName)[0];
        return JSON.parse(sourceData.innerHTML);
    }
    transformRecipe(sourceRecipe) {
        const targetRecipe = {
            title: sourceRecipe.name,
            approval: +sourceRecipe.aggregateRating.ratingValue,
            amountOfPeople: this.getNumberFromString(sourceRecipe.recipeYield),
            preparationSteps: this.transformPreparationSteps(sourceRecipe.recipeInstructions),
            ingredients: this.transformIngredients(sourceRecipe.recipeIngredient),
            videoURL: sourceRecipe.video.contentUrl,
            imageURL: sourceRecipe.video.thumbnailUrl,
            youtubeId: null,
            priceOnAverage: 0,
            nutritionCategory: '',
            allergenics: [],
            preparationTimeInMinuts: 0,
        };
        //TODO do calcualted properties here
        return targetRecipe;
    }
    transformPreparationSteps(sourcePreparationSteps) {
        const targetPreparationSteps = sourcePreparationSteps.map((step) => this.generatePreparationStepTarget(step));
        //remove last element, "Enjoy!"]
        targetPreparationSteps.pop();
        return targetPreparationSteps;
    }
    generatePreparationStepTarget(sourceStep) {
        const targetStep = sourceStep.text;
        return targetStep;
    }
    transformIngredients(sourceIngredients) {
        const targetIngredients = sourceIngredients.map((ingredient) => this.generateIngredientTarget(ingredient));
        return targetIngredients;
    }
    generateIngredientTarget(sourceIngredient) {
        const targetIngredient = {
            name: this.filterIngredientName(sourceIngredient),
            amount: this.filterIngredientAmount(sourceIngredient),
            state: this.filterIngredientState(sourceIngredient),
            required: this.filterIngredientRequired(sourceIngredient),
        };
        return targetIngredient;
    }
    filterIngredientName(sourceIngredient) {
        //TODO have ingredients list, check if any ingredient name is within the string, if it is return the name
        return sourceIngredient;
    }
    filterIngredientAmount(sourceIngredient) {
        //TODO take anythign that is within breakets, if no breaket then take what is left after name and state
        return '';
    }
    filterIngredientState(sourceIngredient) {
        //TODO select the content after last comma if exits
        return '';
    }
    filterIngredientRequired(sourceIngredient) {
        //TODO if option exits between breakets then return true, otherwise return false
        return true;
    }
    getNumberFromString(dataWithNumber) {
        let numberFromString = dataWithNumber.match(/\d+/);
        if (numberFromString !== null && numberFromString[0]) {
            return +(numberFromString[0]);
        }
        console.error("The string did not contain number: ", dataWithNumber);
        this.terminateProgram();
        return -1;
    }
    terminateProgram() {
        process.exit(-1);
    }
}
exports.Crawler = Crawler;
const crawler = new Crawler();
crawler.recipeConstructor();

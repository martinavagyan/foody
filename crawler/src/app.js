"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = __importStar(require("request-promise-native"));
const jsdom_1 = require("jsdom");
const moment = __importStar(require("moment"));
const helper_1 = require("./helper");
class Crawler {
    constructor() {
        this.ingredientMap = helper_1.IngredientHelper.extractIngredientNamesMap();
        this.saveFileName = '../shared/assets/crawler_recipes.json';
    }
    recipeConstructor() {
        return __awaiter(this, void 0, void 0, function* () {
            // const recipeUrl = 'https://tasty.co/recipe/one-pan-fall-chicken-dinner';
            const recipeUrl = 'https://tasty.co/recipe/chicken-bibimbap';
            const sourceRecipe = yield this.getJsonRecipes(recipeUrl);
            const targetRecipe = this.transformRecipe(sourceRecipe);
            // console.log(targetRecipe);
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
            this.getIngredientsFromHtml(result);
            return recipeData;
        });
    }
    getIngredientsFromHtml(html) {
        let dom = new jsdom_1.JSDOM(html);
        const ingredientsDom = dom.window.document.querySelectorAll('.ingredients-prep')[0].getElementsByTagName("li");
        for (let ingredient of ingredientsDom) {
            const measurment = ingredient.querySelector('.non-us-measuremessnt');
            console.log('measurement, ', measurment);
        }
        // console.log('measurement, ', measurment.innerHTML.trim());
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
            videoURL: sourceRecipe.video[0].contentUrl,
            imageURL: sourceRecipe.video[0].thumbnailUrl,
            youtubeId: null,
            preparationTimeInMinuts: this.transformPreparationDuration(sourceRecipe.prepTime, sourceRecipe.cookTime),
            priceOnAverage: 0,
            nutritionCategory: '',
            allergenics: [],
        };
        //TODO do calcualted properties here
        return targetRecipe;
    }
    transformPreparationDuration(prepTime, cookTime) {
        return moment.duration(prepTime).as('minutes') + moment.duration(cookTime).as('minutes');
    }
    transformPreparationSteps(sourcePreparationSteps) {
        const targetPreparationSteps = sourcePreparationSteps.map((step) => this.generatePreparationStepTarget(step));
        //remove last element, "Enjoy!"
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
        for (let name of Array.from(this.ingredientMap.keys())) {
            //console.log(sourceIngredient.toLocaleLowerCase().includes(name), ' sourceIngredient: ', sourceIngredient.toLocaleLowerCase(), ' name: ',name);
            if (sourceIngredient.toLocaleLowerCase().includes(name)) {
                return name;
            }
        }
        return sourceIngredient;
    }
    filterIngredientAmount(sourceIngredient) {
        // TODO take anythign that is within breakets, if no breaket then take what is left after name and state
        // take number followed by keyword combinations [tablespoon, large, teaspoon, tbs, cups, cup ... ]
        // If there is plus difind it into two parts and apply the save before and after plus
        return '';
    }
    filterIngredientState(sourceIngredient) {
        const indexOfLastComma = sourceIngredient.indexOf(',');
        let result = '';
        if (indexOfLastComma !== -1) {
            result = sourceIngredient.substring(indexOfLastComma + 1).trim();
        }
        return result;
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

import { AnalysedPropertyCollector } from './analysed-property-collector';
import { DerivedPropertyCollector } from './derived-property-collector';
import { StaticPropertyCollector } from './static-property-collector';

export class TransformAgent {
  public static async transformRecipe(recipeObject: any, htmlIngredients: any, sourceUrl: string) {
    const staticPropertiesObject = StaticPropertyCollector.collectStaticProperties(recipeObject, sourceUrl);
    const analysedPropertiesObject = await AnalysedPropertyCollector.collectAnalysedProperties(recipeObject, htmlIngredients);

    const derivedPropertiesObject = await DerivedPropertyCollector.collectDerivedProperties(analysedPropertiesObject.ingredients, analysedPropertiesObject.title);

    return Object.assign(staticPropertiesObject, analysedPropertiesObject, derivedPropertiesObject);
  }
}
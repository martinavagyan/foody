import { AnalysedPropertyCollector } from './analysed-property-collector';
import { DerivedPropertyCollector } from './derived-property-collector';
import { StaticPropertyCollector } from './static-property-collector';

export class TransformAgent {
  public static async transformRecipe(recipeObject: any) {
    StaticPropertyCollector.collectStaticProperties(recipeObject);
    //TODO analysed
    //TODO derived
  }

}
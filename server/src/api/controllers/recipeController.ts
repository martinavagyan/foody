import Base from './baseController';

/**
 * User class
 * */

export default class RecipeClass<T extends any> extends Base<T> {
    constructor(model: T) {
        super(model);
    }

    public async insertAll(req: any, res: any) {
        const jsonObjects = req.body;
        const resArray:any = [];
        for(let jsonObject of jsonObjects) {
            let obj = new this.model(jsonObject);
            await obj.save((err: any, item: any) => {
                if (err) {
                    return console.error(err);
                }
                resArray.push(obj);
            });
        }
        res.status(200).json(resArray);
    }

    public getRecipesForWeek(red: any, res: any, userSettings: any) {
        this.model.find({amountOfPeople: {$gte: userSettings.numberOfPeople}, 
                         nutritionCategory: {$lte: userSettings.nutritionCategory},
                         allergenics: {$nin: userSettings.allergenics}
        },
            (err: any, obj: any) => {
                if (err) {
                    return console.error(err);
                }
                res.json(obj);
            }
        ).sort({approval: -1}).limit(7);;
    }

    public get(req: any, res: any) {
        this.model.findOne({_id: req.params.recipeId}, (err: any, obj: any) => {
            if (err) {
                return console.error(err);
            }
            res.json(obj);
        });
    }
}

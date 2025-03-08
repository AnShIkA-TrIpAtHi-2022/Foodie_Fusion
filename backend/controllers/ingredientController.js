//const { createIngredientsCategory, updateStock } = require("../service/ingredient.service");
const ingredientService=require("../services/ingredient.service.js");
module.exports={
    createIngredientCategory:async (req,res)=>{
        try{
            const{name,restaurantId}=req.body;
            const items=await ingredientService.createIngredientCategory(name,restaurantId);
            res.status(200).json(items);
        }
        catch(error){
            res.status(500).json({ error:"internal server error",message:error.message});
    }
},
createIngredient:async(req,res)=>{
    try{
        const{restaurantId,name,ingredientCategoryId}=req.body;
        console.log(req.body);
        const item=await ingredientService.createIngredientsItem(
            restaurantId,name,ingredientCategoryId
        );
        return res.status(200).json(item);
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:true,message:error.message});
    }
},
updateStock:async(req,res)=>{
    try{
        const{id}=req.params;
        const item=await ingredientService.updateStock(id);
        res.status(200).json(item);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
},
restaurantsIngredient:async(req,res)=>{
    try{
        const{id}=req.params;
        const items=await ingredientService.findRestaurantsIngredients(id);
        res.status(200).json(items);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
},
restaurantsIngredientCategory:async(req,res)=>{
    try{
        const{id}=req.params;
        const items=await ingredientService.findIngredientsCategoryByRestaurantId(id);
        res.status(200).json(items);
    }
    catch(error){
        res.status(500).json({error:"internal server error"});
    }
},
};
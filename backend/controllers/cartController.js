const cartService=require("../services/cart.service");
const userService=require("../services/user.service");

module.exports={
    addItemToCart:async(req,res)=>{
        try{
            console.log("Adding item to cart for user:", req.user); // Debugging
            const user=req.user;
            const cart=await cartService.addItemToCart(req.body,user._id);
            console.log("Cart updated successfully:", cart); // Debugging
            res.status(200).json(cart);
        }
        catch(error){
            console.error("Error in addItemToCart:", error); // Debugging
            if( error instanceof Error){
                res.status(400).json({ error:error.message});
            }
            else{
                res.status(500).json({ error:"Internal server error"});
            }
        }
    },
    updateCartItemQuantity:async(req,res)=>{
        try{
            console.log("Updating cart item quantity:", req.body); // Debugging
            const{cartItemId,quantity}=req.body;
            const cart=await cartService.updateCartItemQuantity(
                cartItemId,
                quantity
            );
            console.log("Cart item quantity updated successfully:", cart); // Debugging
            res.status(200).json(cart);
        }
        catch(error){
            console.error("Error in updateCartItemQuantity:", error); // Debugging
            if( error instanceof Error){
                res.status(400).json({ error:error.message});
            }
            else{
                res.status(500).json({ error:"Internal server error"});
            }
        }
    },
    removeItemFromCart:async(req,res)=>{
        try{
            console.log("Removing item from cart:", req.params.id); // Debugging
            const { id}=req.params;
            const user=req.user;
            const cart=await cartService.removeItemFromCart(id,user);
            console.log("Item removed from cart successfully:", cart); // Debugging
            res.status(200).json(cart);
        }
        catch(error){
            console.error("Error in removeItemFromCart:", error); // Debugging
            if( error instanceof Error){
                res.status(400).json({ error:error.message});
            }
            else{
                res.status(500).json({ error:"Internal server error"});
            }
        }
    },
    findUserCart:async(req,res)=>{
        try{
            console.log("Fetching cart for user:", req.user); // Debugging
            const user=req.user;
            const cart=await cartService.findCartByUserId(user._id.toString());
            console.log("User cart fetched successfully:", cart); // Debugging
            res.status(200).json(cart);
        }
        catch(error){
            console.error("Error in findUserCart:", error); // Debugging
            if( error instanceof Error){
                res.status(400).json({ error:error.message});
            }
            else{
                res.status(500).json({ error:"Internal server error"});
            }

        }
    },
    clearCart:async(req,res)=>{
        try{
            console.log("Clearing cart for user:", req.user); // Debugging
            const user=req.user;
            const cart=await cartService.clearCart(user);
            console.log("Cart cleared successfully:", cart); // Debugging
            res.status(200).json(cart);
        }
        catch(error){
            console.error("Error in clearCart:", error); // Debugging
            if( error instanceof Error){
                res.status(400).json({ error:error.message});
            }
            else{
                res.status(500).json({ error:"Internal server error"});
            }

        }
    },
};

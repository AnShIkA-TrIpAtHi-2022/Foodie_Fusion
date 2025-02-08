module.exports={
    async createRestuarant(req,user){
        try{
            const address=new address({
                city:req.address.city,
                country:req.address.country,
                fullName:req.address.fullname,
                postalCode:req.address.postalCode,
                state:req.address.state,
                streetAddress:req.address.streetAddress
            })
            const savedAddress=await address.save();
            const restaurant=new restaurant({
                address:savedAddress._id,
                contactInformation:req.contactInformation,
                cuisineType:req.cuisineType,
                description:req.description,
                images:req.images,
                name:req.name,
                openingHours:req.openeningHours,
                registrationDate:req.registrationDate,
                owner:user
            });
            const savedRestaurant=await restaurant.save();
            return savedRestaurant;
        }
        catch(error){
              throw new Error(Error.message);
        }
    },
    async getAllRestuarants(){
          try{
                const restaurants=await Restaurant.find();
                return restaurants;
          }
          catch(error){
                throw new Error(error.message);
          }
    },
    async findRestaurantById(restaurantId){
        try{
              const restaurant=await restaurant.findById(restaurantId);
              if(!restaurant) throw new Error("restaurant not found");
              return restaurant;
        }
        catch(error){
              throw new Error(error.message);
        }
    },
    async deleteRestaurant(restaurantId){
        try{   
              this.findRestaurantById(restaurantId);
              const restaurant=await restaurant.deleteById(restaurantId);
              
        }
        catch(error){
              throw new Error(error.message);
        }
    },
    async getRestaurantByUserId(userId){
        try{   
              
            const restaurant=await restaurant.findOne({owner:userid}).populate("owner").populate("address");
            if(!restaurant){
                throw new Error("restaurant not found");
            }
        }
        catch(error){
              throw new Error(error.message);
        }
    },
    async searchRestaurant(keyword){
        try{   
              
              const restaurants=await Restaurant.find({
                $or:[
                    {
                        name:{$regex:keyword,$options:"i"},
                        description:{$regex:keyword,$options:"i"},
                        cuisineType:{$regex:keyword,$options:"i"},
                    }
                ]
              });
              return restaurants;
              
        }
        catch(error){
              throw new Error(error.message);
        }
    },
    async addToFavourite(restaurantId,user){
        try{
            const restaurant=this.findRestaurantsById(restaurantId);
            const dto={
                _id:restaurant._id,
                title:restaurant.name,
                images:restaurant.images,
                description:restaurant.description
            }
            const favourites=user.favourites.filter||[];
            const index=favourites.findIndex(favourites=>favourites._id===restaurantId);
            if(index!==-1){
                favourites.splice(index,1);
            }
            else{
                favourites.push(dto);
            }
            user.favourites=favourites;
            await user.save();
            return dto;

        }
        catch(error){
            throw new Error(error.message);
        }
    },
    async updateRestaurantStatus(id){
        try{
            const restaurant=await Restaurant.findById(id).populate('owner').populate("address");
            if(!restaurant){
                throw new Error("restaurant not found");
            }
            restaurant.open=!restaurant.open;
            await restaurant.save();
            return restaurant;

        }
        catch(error){
            throw new Error(error.message);
        }
    }

}

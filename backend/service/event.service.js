const { findById } = require("../models/cart.model");
const Events = require("../models/event.model.js");
const Restaurant = require("../models/restaurant.model.js");

module.exports = {
    async createEvent(event, restaurantId) {
        try {
            const restaurant = await Restaurant.findById(restaurantId);
            if (!restaurant) {
                throw new Error(`Restaurant not found with ID ${restaurantId}`);
            }

            const createdEvent = new Events({
                restaurant: restaurantId,
                image: event.image,
                startedAt: event.startedAt,
                endsAt: event.endsAt,
                location: event.location,
                name: event.name
            });

            await createdEvent.save();
            return createdEvent;
        } catch (error) {
            throw new Error(`Error creating event: ${error.message}`);
        }
    },

    async findAllEvent() {
        try {
            const events = await Events.find();
            return events;
        } catch (error) {
            throw new Error(`Error finding all events: ${error.message}`);
        }
    },

    async findRestaurantsEvent(restaurantId) {
        try {
            const events = await Events.find({ restaurant: restaurantId });
            return events;
        } catch (error) {
            throw new Error(`Failed to find events for restaurant ID ${restaurantId}: ${error.message}`);
        }
    },

    async deleteEvent(eventId) {
        try {
            const deletedEvent = await Events.findByIdAndDelete(eventId);
            if (!deletedEvent) {
                throw new Error(`Event not found with ID ${eventId}`);
            }
            return { message: `Event with ID ${eventId} deleted successfully.` };
        } catch (error) {
            throw new Error(`Error deleting event ${eventId}: ${error.message}`);
        }
    },

    async findById(eventId) {
        try {
            const event = await Events.findById(eventId);
            if (!event) {
                throw new Error(`Failed to find event with ID ${eventId}`);
            }
            return event;
        } catch (error) {
            throw new Error(`Error finding event with ID ${eventId}: ${error.message}`);
        }
    }
};

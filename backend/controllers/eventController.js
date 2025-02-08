const eventService = require("../services/event.service");

module.exports = {
    createEvents: async (req, res) => {
        try {
            const { event } = req.body;
            const { restaurantId } = req.params;
            const createdEvents = await eventService.createEvent(event, restaurantId);
            res.status(201).json(createdEvents); // 201 for resource creation
        } catch (error) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    },

    findAllEvents: async (req, res) => {
        try {
            const events = await eventService.findAllEvent();
            res.status(200).json(events); // 200 for successful retrieval
        } catch (error) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    },

    findRestaurantEvents: async (req, res) => {
        try {
            const { restaurantId } = req.params;
            const events = await eventService.findRestaurantsEvent(restaurantId);
            res.status(200).json(events); // 200 for successful retrieval
        } catch (error) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    },

    deleteEvents: async (req, res) => {
        try {
            const { id } = req.params;
            await eventService.deleteEvent(id); // Added 'await' to properly execute the deletion
            res.status(200).json({ message: "Event deleted successfully", success: true });
        } catch (error) {
            res.status(500).json({ error: error.message || "Internal server error" });
        }
    }
};

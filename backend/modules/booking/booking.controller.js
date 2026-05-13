const service = require('./booking.service');

const create = async (req, res) => {
    try {
        const { name, email, phone, workshopId, workshopTitle, amount, priceType } = req.body;
        if (!name || !email || !phone || !workshopId) {
            return res.status(400).json({ success: false, message: 'Name, email, phone and workshopId are required.' });
        }
        const data = await service.createBooking({ name, email, phone, workshopId, workshopTitle, amount, priceType });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const data = await service.getAllBookings();
        return res.status(200).json({ success: true, data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const remove = async (req, res) => {
    try {
        const data = await service.deleteBooking(req.params.id);
        return res.status(200).json({ success: true, message: data.message });
    } catch (error) {
        return res.status(404).json({ success: false, message: error.message });
    }
};

module.exports = { create, getAll, remove };

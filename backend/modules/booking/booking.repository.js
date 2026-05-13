const { Booking, Workshop } = require('../../models');

const createBooking = async (data) => {
    return await Booking.create(data);
};

const getAllBookings = async () => {
    return await Booking.findAll({
        include: [{ model: Workshop, attributes: ['title', 'date', 'mode'] }],
        order: [['createdAt', 'DESC']],
    });
};

const deleteBooking = async (id) => {
    const booking = await Booking.findByPk(id);
    if (!booking) throw new Error('Booking not found');
    await booking.destroy();
    return { message: 'Booking deleted successfully' };
};

module.exports = { createBooking, getAllBookings, deleteBooking };

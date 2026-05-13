const repo = require('./booking.repository');

const createBooking = async (data) => await repo.createBooking(data);
const getAllBookings = async () => await repo.getAllBookings();
const deleteBooking = async (id) => await repo.deleteBooking(id);

module.exports = { createBooking, getAllBookings, deleteBooking };

const { Testimonial } = require("../../models");

const createTestimonial = async (data) => {
    return await Testimonial.create(data);
};

const getAllTestimonials = async () => {
    return await Testimonial.findAll({
        order: [["createdAt", "DESC"]]
    });
};

const getTestimonialById = async (id) => {
    return await Testimonial.findByPk(id);
};

const updateTestimonial = async (id, data) => {
    return await Testimonial.update(data, { where: { id } });
};

const deleteTestimonial = async (id) => {
    return await Testimonial.destroy({ where: { id } });
};

module.exports = {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
};

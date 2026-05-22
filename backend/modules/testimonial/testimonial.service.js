const repository = require("./testimonial.repository");

const createTestimonial = async (data) => {
    const { text, name, location, type } = data;
    if (type === 'text' && (!text || !name || !location)) {
        throw new Error("Text, name, and location are required for text testimonials.");
    }
    return await repository.createTestimonial(data);
};

const getAllTestimonials = async () => {
    return await repository.getAllTestimonials();
};

const getTestimonialById = async (id) => {
    const testimonial = await repository.getTestimonialById(id);
    if (!testimonial) {
        throw new Error("Testimonial not found");
    }
    return testimonial;
};

const updateTestimonial = async (id, data) => {
    const testimonial = await repository.getTestimonialById(id);
    if (!testimonial) {
        throw new Error("Testimonial not found");
    }
    await repository.updateTestimonial(id, data);
    return { message: "Testimonial updated successfully" };
};

const deleteTestimonial = async (id) => {
    const testimonial = await repository.getTestimonialById(id);
    if (!testimonial) {
        throw new Error("Testimonial not found");
    }
    await repository.deleteTestimonial(id);
    return { message: "Testimonial deleted successfully" };
};

module.exports = {
    createTestimonial,
    getAllTestimonials,
    getTestimonialById,
    updateTestimonial,
    deleteTestimonial
};

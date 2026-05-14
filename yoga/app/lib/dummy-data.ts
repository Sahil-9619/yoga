export const DUMMY_CATEGORY = {
  id: 'dummy-breathwork-category',
  name: 'Breathwork Basics',
  workshopCount: 1,
};

export const DUMMY_WORKSHOP = {
  id: 'dummy-breathwork-workshop',
  title: 'Foundations of Conscious Breath',
  description:
    'A beginner-friendly workshop exploring calming pranayama, mindful breathing patterns, and simple daily rituals for clarity and emotional balance.',
  photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80',
  date: '2026-06-21T10:00:00.000Z',
  time: '10:00 AM - 12:00 PM',
  mode: 'online' as const,
  location: '',
  platform: 'Zoom',
  priceType: 'free' as const,
  amount: 0,
  categoryId: DUMMY_CATEGORY.id,
  Category: DUMMY_CATEGORY,
};

export const DUMMY_CATEGORIES = [DUMMY_CATEGORY];
export const DUMMY_WORKSHOPS = [DUMMY_WORKSHOP];

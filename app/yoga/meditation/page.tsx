import YogaTemplate from '../../components/YogaTemplate';

export default function MeditationPage() {
  return (
    <YogaTemplate 
      title="Meditation"
      subtitle="Inner Stillness"
      description="Learn to observe the mind without judgment. Our meditation techniques help you find a sanctuary of peace within yourself, regardless of outer circumstances."
      benefits={[
        "Enhances cognitive function and memory.",
        "Reduces symptoms of depression and anxiety.",
        "Promotes emotional resilience and stability.",
        "Lowers blood pressure and improves heart health."
      ]}
      image="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80"
    />
  );
}

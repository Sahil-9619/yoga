import YogaTemplate from '../../components/YogaTemplate';

export default function BreathworkPage() {
  return (
    <YogaTemplate 
      title="Breathwork"
      subtitle="Modern Breathing Mastery"
      description="Experience the transformative power of conscious breathing. These techniques are designed for the modern lifestyle to help you manage stress, boost energy, and achieve deep mental clarity."
      benefits={[
        "Instant nervous system regulation and stress relief.",
        "Improved focus and mental performance.",
        "Deep emotional release and somatic healing.",
        "Enhanced athletic performance and recovery."
      ]}
      image="/images/breathwork.png"
    />
  );
}

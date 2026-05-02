import YogaTemplate from '../../components/YogaTemplate';

export default function BreathworkPage() {
  return (
    <YogaTemplate 
      title="Pranayama"
      subtitle="The Science of Breath"
      description="Master your life force (Prana) through ancient breathing techniques that recalibrate your nervous system and expand your consciousness."
      benefits={[
        "Reduces anxiety and cortisol levels instantly.",
        "Increases lung capacity and oxygen absorption.",
        "Improves sleep quality and immune response.",
        "Balances the left and right brain hemispheres."
      ]}
      image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80"
    />
  );
}

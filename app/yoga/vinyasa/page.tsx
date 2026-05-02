import YogaTemplate from '../../components/YogaTemplate';

export default function VinyasaPage() {
  return (
    <YogaTemplate 
      title="Vinyasa Flow"
      subtitle="Fluid Motion"
      description="Connect every movement with a breath. Vinyasa is a dynamic practice that builds heat, strength, and cardiovascular health through continuous flow."
      benefits={[
        "Enhances cardiovascular health and stamina.",
        "Builds lean muscle strength and tone.",
        "Improves focus through moving meditation.",
        "Promotes detoxification through sweat and breath."
      ]}
      image="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80"
    />
  );
}

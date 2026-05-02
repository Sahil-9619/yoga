import YogaTemplate from '../../components/YogaTemplate';

export default function HathaPage() {
  return (
    <YogaTemplate 
      title="Hatha Yoga"
      subtitle="Classical Balance"
      description="The foundation of all yoga styles, focusing on physical postures (asanas) and breath (pranayama) to bring balance to the body and mind."
      benefits={[
        "Improves flexibility and joint mobility.",
        "Strengthens core and improves posture.",
        "Reduces stress and promotes deep relaxation.",
        "Balances the endocrine and nervous systems."
      ]}
      image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
    />
  );
}

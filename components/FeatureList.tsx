type FeatureListProps = {
  features: string[];
};

export function FeatureList({ features }: FeatureListProps) {
  return (
    <ul>
      {features.map((feature) => (
        <li key={feature}>{feature}</li>
      ))}
    </ul>
  );
}

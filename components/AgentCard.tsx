type AgentCardProps = {
  title: string;
  description: string;
};

export function AgentCard({ title, description }: AgentCardProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

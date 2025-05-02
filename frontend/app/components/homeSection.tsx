// components/Section.tsx
'use client';

type SectionProps = {
  index: number;
  children: React.ReactNode;
};

export default function HomeSection({ index, children }: SectionProps) {
  const bgClass =
    index % 2 === 0
      ? 'bg-[var(--color-background)]'
      : 'bg-[var(--color-background-2)]';

  return (
    <section className={`${bgClass} px-8 py-16`}>
      <div className="max-w-5xl mx-auto">{children}</div>
    </section>
  );
}

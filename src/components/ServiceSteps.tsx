export interface ServiceStep {
  title: string;
  body: string;
}

export function ServiceSteps({ steps }: { steps: ServiceStep[] }) {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-5">
          <span
            className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full border border-accent text-accent-dark font-display text-lg"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <div>
            <h3 className="font-display text-xl text-charcoal mb-2">{step.title}</h3>
            <p className="text-body text-charcoal-light leading-relaxed">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

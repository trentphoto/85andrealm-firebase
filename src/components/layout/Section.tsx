import clsx from "clsx";

export default function Section({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <section className={clsx(
        'px-4 md:px-12',
        className
    )}>
        { children }
    </section>
  )
}

import { cn } from '@/lib/cn'

/**
 * Bare underline field. Phase 5 adds the error slot and Phase 2/3 draws the
 * accent underline on focus with GSAP — the CSS transition below is the
 * reduced-motion / no-JS floor, so the field is never dead.
 */
export function Field({
  name,
  label,
  type = 'text',
  required,
  textarea,
  options,
  className,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  textarea?: boolean
  options?: readonly string[]
  className?: string
}) {
  const id = `field-${name}`
  const control =
    'peer text-body text-text placeholder:text-chalk-600 w-full bg-transparent pt-2 pb-3 outline-none'

  return (
    <div className={cn('field group relative', className)}>
      <label htmlFor={id} className="u-label block">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>

      {textarea ? (
        <textarea id={id} name={name} required={required} rows={4} className={control} />
      ) : options ? (
        <select id={id} name={name} required={required} className={cn(control, 'appearance-none')}>
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink-850">
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={name} type={type} required={required} className={control} />
      )}

      <span aria-hidden className="bg-rule block h-px w-full" />
      <span
        aria-hidden
        className="field-underline bg-accent absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-(--ease-brutal) peer-focus:scale-x-100"
      />
    </div>
  )
}

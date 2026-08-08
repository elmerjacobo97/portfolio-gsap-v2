'use client'

import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'

/**
 * Underline field. GSAP draws the accent underline on focus; the CSS
 * transition on the same element is the reduced-motion / pre-hydration floor,
 * so the field is never visually dead.
 */
export function Field({
  name,
  label,
  type = 'text',
  autoComplete,
  required,
  textarea,
  options,
  error,
  defaultValue,
  className,
}: {
  name: string
  label: string
  type?: string
  autoComplete?: string
  required?: boolean
  textarea?: boolean
  options?: readonly string[]
  error?: string
  defaultValue?: string
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const id = `field-${name}`
  const errorId = `${id}-error`

  // Shake + recolour when the server rejects this field.
  useGSAP(
    () => {
      if (!error) return
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        gsap.fromTo(rootRef.current, { x: -4 }, {
          x: 0,
          duration: 0.28,
          ease: 'power2.out',
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [error] },
  )

  const control =
    'peer text-body text-text placeholder:text-chalk-600 w-full bg-transparent pt-2 pb-3 outline-none'
  const isSelect = Boolean(options)

  return (
    <div ref={rootRef} className={cn('field group relative', className)}>
      <label htmlFor={id} className="u-label block">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          /*
           * The native resize grabber is the one un-styleable widget on the
           * page and it sat in the corner of an otherwise hairline-only form.
           * field-sizing-content grows the box with the text instead, so
           * nothing is lost by turning the handle off; `rows` stays as the
           * floor and as the fallback where field-sizing isn't supported.
           */
          className={cn(control, 'resize-none field-sizing-content')}
        />
      ) : options ? (
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue || undefined}
          className={cn(control, 'appearance-none pr-8')}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink-850">
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={control}
        />
      )}

      {isSelect ? (
        <ChevronDown
          aria-hidden
          size={16}
          strokeWidth={1.5}
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="pointer-events-none absolute right-0 bottom-3 text-text-dim"
        />
      ) : null}

      <span
        aria-hidden
        className={cn('block h-px w-full', error ? 'bg-alert-500' : 'bg-rule')}
      />
      <span
        aria-hidden
        className={cn(
          'field-underline absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-(--ease-brutal) peer-focus:scale-x-100',
          error ? 'bg-alert-500' : 'bg-accent',
        )}
      />

      {error ? (
        <p id={errorId} className="u-label text-alert-500 mt-2">
          {error}
        </p>
      ) : null}
    </div>
  )
}

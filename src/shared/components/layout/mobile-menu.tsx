"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import type { NavLink } from "./nav-types";

export function MobileMenu({
	open,
	onCloseAction,
	onNavigateAction,
	links,
	label,
	closeLabel,
}: {
	open: boolean;
	onCloseAction: () => void;
	onNavigateAction: (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => void;
	links: readonly NavLink[];
	label: string;
	closeLabel: string;
}) {
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	return (
		<dialog
			ref={dialogRef}
			aria-label={label}
			onCancel={(e) => {
				e.preventDefault();
				onCloseAction();
			}}
			className="bg-accent-fill text-on-accent overscroll-contain fixed inset-0 z-[60] m-0 h-dvh max-h-none w-full max-w-none flex-col p-0 backdrop:bg-scrim/80 open:flex md:hidden"
		>
			<div className="grid-page items-center py-4">
				<button
					type="button"
					onClick={onCloseAction}
					className="u-label col-span-12 inline-flex items-center justify-end gap-2 text-right !text-current"
				>
					{closeLabel}
					<X
						aria-hidden
						size={16}
						strokeWidth={1.5}
						strokeLinecap="square"
						strokeLinejoin="miter"
					/>
				</button>
			</div>

			<nav
				aria-label="Primary"
				className="page-pad flex flex-1 flex-col justify-center gap-2"
			>
				{links.map((link, i) => (
					<a
						key={link.href}
						href={link.href}
						onClick={(e) => onNavigateAction(e, link.href)}
						className="text-h1 u-wide flex items-baseline gap-4"
					>
						<span className="u-label !text-on-accent/60 shrink-0">
							{String(i + 1).padStart(2, "0")}
						</span>
						{link.label}
					</a>
				))}
			</nav>
		</dialog>
	);
}

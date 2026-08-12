"use client";

import dynamic from "next/dynamic";
import { CalendarDays, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { site } from "@/data/site";
import { ChannelRow } from "./ChannelRow";

/**
 * The Cal embed is the heaviest thing on the page and almost nobody clicks it
 * on a first visit, so it costs 0 KB until they do.
 *
 * `ssr: false` is only legal inside a 'use client' module in Next 16 — this
 * file is exactly that boundary.
 */
const CalEmbed = dynamic(() => import("./CalEmbed"), { ssr: false });

export function CalButton({
	label,
	closeLabel,
}: {
	label: string;
	closeLabel: string;
}) {
	const [open, setOpen] = useState(false);
	const dialogRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		if (!open) return;
		const dialog = dialogRef.current;
		if (dialog && !dialog.open) dialog.showModal();
	}, [open]);

	const dialog = (
		<dialog
			ref={dialogRef}
			aria-label={label}
			onClose={() => setOpen(false)}
			className="bg-canvas/95 text-text m-0 h-dvh max-h-none w-screen max-w-none border-0 p-0 backdrop:bg-canvas/70 backdrop:backdrop-blur-md open:flex open:flex-col"
		>
			<div className="page-pad flex justify-end py-5">
				<button
					type="button"
					autoFocus
					onClick={() => dialogRef.current?.close()}
					className="u-meta text-text hover:text-accent inline-flex items-center gap-2 transition-colors duration-200"
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
			<div className="page-pad flex-1 overflow-auto pb-8">
				<CalEmbed />
			</div>
		</dialog>
	);

	return (
		<>
			<ChannelRow
				label={label}
				value="cal.com"
				href={`https://cal.com/${site.calLink}`}
				icon={CalendarDays}
				onActivateAction={() => setOpen(true)}
			/>

			{/*
			 * Portalled to <body>. This component renders inside #smooth-content,
			 * whose transform creates a containing block — a `position: fixed`
			 * dialog left in place would anchor to the scrolling content instead of
			 * the viewport, putting the close button thousands of pixels off-screen.
			 */}
			{/* No mounted guard needed: `open` can only be set by a click, so this
          branch is unreachable during server rendering. */}
			{open ? createPortal(dialog, document.body) : null}
		</>
	);
}

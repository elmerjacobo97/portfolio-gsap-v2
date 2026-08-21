import type {
	AnchorHTMLAttributes,
	HTMLAttributes,
	ImgHTMLAttributes,
} from "react";

import { TransitionLink } from "@/components/motion/TransitionLink";
import { Callout } from "./Callout";

/**
 * Only the elements that need behavior or structure deviate from raw HTML;
 * the reading typography itself lives in `.post-body` (globals.css) so the
 * MDX stays plain and the prose voice stays in one place.
 */
function MdxLink({
	href = "",
	children,
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
	if (href.startsWith("/")) {
		return <TransitionLink href={href}>{children}</TransitionLink>;
	}
	return (
		<a href={href} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	);
}

function MdxImage({
	alt = "",
	...props
}: ImgHTMLAttributes<HTMLImageElement>) {
	return <img alt={alt} loading="lazy" decoding="async" {...props} />;
}

function MdxTable(props: HTMLAttributes<HTMLTableElement>) {
	return (
		<div className="overflow-x-auto">
			<table {...props} />
		</div>
	);
}

export const mdxComponents = {
	a: MdxLink,
	img: MdxImage,
	table: MdxTable,
	Callout,
};

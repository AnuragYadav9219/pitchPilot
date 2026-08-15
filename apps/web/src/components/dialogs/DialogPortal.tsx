import { createPortal } from "react-dom";
import type { ReactNode } from "react";

interface DialogPortalProps {
    children: ReactNode;
}

export function DialogPortal({
    children,
}: DialogPortalProps) {
    return createPortal(
        children,
        document.body,
    );
}
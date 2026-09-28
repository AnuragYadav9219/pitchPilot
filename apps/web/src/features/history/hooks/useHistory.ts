import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyGetHistoryQuery } from "../historyApi";
import type { HistoryItem } from "../types";

const PAGE_SIZE = 10;
const LOAD_THRESHOLD = 500;

interface UseHistoryReturn {
    history: HistoryItem[];
    hasMore: boolean;
    initialLoading: boolean;
    loadingMore: boolean;
    error: boolean;
    retry: () => void;
}

export function useHistory(): UseHistoryReturn {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(false);

    const loadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(0);
    const [getHistory] = useLazyGetHistoryQuery();

    // Load a specific page.
    const loadPage = useCallback(async (pageNumber: number) => {
        if (loadingRef.current || (pageNumber > 0 && !hasMoreRef.current)) return;

        loadingRef.current = true;
        pageNumber === 0 ? setInitialLoading(true) : setLoadingMore(true);
        setError(false);

        try {
            console.log(`[History] Loading page ${pageNumber}`);
            const response = await getHistory({ page: pageNumber, size: PAGE_SIZE }).unwrap();
            const result = response.data;

            if (!result) {
                hasMoreRef.current = false;
                setHasMore(false);
                return;
            }

            console.log("[History] Response:", {
                page: result.number,
                received: result.content.length,
                total: result.totalElements,
                totalPages: result.totalPages,
                last: result.last,
            });

            // First page replaces the list; other pages append.
            setHistory((current) => {
                if (pageNumber === 0) return result.content;
                const existingIds = new Set(current.map((item) => item.interviewId));
                const newItems = result.content.filter((item) => !existingIds.has(item.interviewId));
                return [...current, ...newItems];
            });

            pageRef.current = pageNumber;
            const more = !result.last;
            hasMoreRef.current = more;
            setHasMore(more);
        } catch (error) {
            console.error("[History] Failed to load:", error);
            setError(true);
        } finally {
            loadingRef.current = false;
            setInitialLoading(false);
            setLoadingMore(false);
        }
    }, [getHistory]);

    // Initial load.
    useEffect(() => {
        loadPage(0);
    }, [loadPage]);

    // Check whether the user is close enough to the bottom.
    const checkForMore = useCallback(() => {
        if (loadingRef.current || !hasMoreRef.current) return;

        const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        const viewportHeight = window.innerHeight;
        const documentHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const distanceFromBottom = documentHeight - (scrollTop + viewportHeight);

        if (distanceFromBottom <= LOAD_THRESHOLD) {
            const nextPage = pageRef.current + 1;
            console.log(`[History] Requesting page ${nextPage}`);
            loadPage(nextPage);
        }
    }, [loadPage]);

    // Infinite scroll listener.
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                checkForMore();
                ticking = false;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
        checkForMore();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("scroll", handleScroll, true);
        };
    }, [checkForMore]);

    // If the first page doesn't make the document tall enough to scroll, load the next page automatically.
    useEffect(() => {
        if (initialLoading || loadingMore || !hasMoreRef.current) return;

        const timer = window.setTimeout(() => {
            checkForMore();
        }, 100);

        return () => window.clearTimeout(timer);
    }, [history.length, initialLoading, loadingMore, checkForMore]);

    // Reset and retry from page 0.
    const retry = useCallback(() => {
        pageRef.current = 0;
        hasMoreRef.current = true;
        loadingRef.current = false;
        setHistory([]);
        setHasMore(true);
        setError(false);
        loadPage(0);
    }, [loadPage]);

    return {
        history,
        hasMore,
        initialLoading,
        loadingMore,
        error,
        retry,
    };
}
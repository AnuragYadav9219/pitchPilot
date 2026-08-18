import { useCallback, useState } from "react";
import {
    useArchiveConversationMutation,
    useDeleteConversationMutation,
    useGetConversationsQuery,
} from "../conversationApi";

const PAGE_SIZE = 10;

export function useConversationHistory() {
    const [page, setPage] = useState(0);

    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useGetConversationsQuery({
        page,
        size: PAGE_SIZE,
    });

    const [archiveConversation, { isLoading: isArchiving }] = useArchiveConversationMutation();
    const [deleteConversation, { isLoading: isDeleting }] = useDeleteConversationMutation();

    const pagination = data?.data;
    const conversations = pagination?.content ?? [];
    const totalPages = pagination?.totalPages ?? 0;
    const totalElements = pagination?.totalElements ?? 0;
    const isFirst = pagination?.first ?? true;
    const isLast = pagination?.last ?? true;

    const nextPage = useCallback(() => {
        if (isFetching || isLast) {
            return;
        }
        setPage((current) => current + 1);
    }, [isFetching, isLast]);

    const previousPage = useCallback(() => {
        if (isFetching || isFirst) {
            return;
        }
        setPage((current) => Math.max(0, current - 1));
    }, [isFetching, isFirst]);

    const archive = useCallback(
        async (conversationId: string) => {
            await archiveConversation(conversationId).unwrap();
        },
        [archiveConversation]
    );

    const remove = useCallback(
        async (conversationId: string) => {
            await deleteConversation(conversationId).unwrap();
        },
        [deleteConversation]
    );

    return {
        conversations,
        page,
        pageSize: PAGE_SIZE,
        totalPages,
        totalElements,
        isFirst,
        isLast,
        nextPage,
        previousPage,
        isLoading,
        isFetching,
        isArchiving,
        isDeleting,
        error,
        archive,
        remove,
        refetch,
    };
}
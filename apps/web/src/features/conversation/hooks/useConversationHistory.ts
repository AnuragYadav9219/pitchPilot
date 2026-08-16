import {
    useMemo,
    useState,
} from "react";

import {
    useArchiveConversationMutation,
    useGetConversationsQuery,
} from "../conversationApi";

export function useConversationHistory() {
    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch,
    } = useGetConversationsQuery();

    const [
        archiveConversation,
        {
            isLoading:
            isArchiving,
        },
    ] = useArchiveConversationMutation();

    const [
        search,
        setSearch,
    ] = useState("");

    const conversations =
        data?.data ?? [];

    const filteredConversations =
        useMemo(() => {
            const query =
                search
                    .trim()
                    .toLowerCase();

            if (!query) {
                return conversations;
            }

            return conversations.filter(
                (conversation) =>
                    (
                        conversation.title ??
                        "Practice Session"
                    )
                        .toLowerCase()
                        .includes(query),
            );
        }, [
            conversations,
            search,
        ]);

    const archive = async (
        conversationId: string,
    ) => {
        await archiveConversation(
            conversationId,
        ).unwrap();
    };

    return {
        conversations,
        filteredConversations,

        search,
        setSearch,

        isLoading,
        isFetching,
        isArchiving,

        error,

        archive,
        refetch,
    };
}
import { supabase } from "@/lib/supabase";

export async function getEarlyAccessCount(): Promise<number> {
    const { data, error } = await supabase.rpc(
        "get_early_access_count",
    );

    if (error) {
        console.error(
            "Failed to fetch early access count:",
            error,
        );

        throw error;
    }

    return Number(data ?? 0);
}
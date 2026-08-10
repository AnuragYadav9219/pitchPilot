import { supabase } from "@/lib/supabase";

export interface PreRegistrationData {
    name: string;
    email: string;
}

export async function createPreRegistration(
    data: PreRegistrationData,
) {
    const name = data.name.trim();
    const email = data.email.trim().toLowerCase();

    if (!name) {
        throw new Error("Please enter your name.");
    }

    if (!email) {
        throw new Error(
            "Please enter your email address.",
        );
    }

    const { error } = await supabase
        .from("pre_registrations")
        .insert({
            name,
            email,
        });

    if (error) {
        console.error(
            "Supabase pre-registration error:",
            error,
        );

        if (error.code === "23505") {
            throw new Error(
                "This email is already registered for early access.",
            );
        }

        throw new Error(
            "Unable to join early access. Please try again.",
        );
    }
}
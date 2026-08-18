import { useId, useEffect, useState } from "react";
import { Check, Pencil, Phone, UserRound, X } from "lucide-react";

import { Button, Card } from "@/components/ui";
import { ProfileField } from "./ProfileField";

interface PersonalInformationCardProps {
    fullName: string;
    phoneNumber: string | null;
    loading: boolean;
    onSave: (data: { fullName: string; phoneNumber: string }) => void;
}

interface FormState {
    fullName: string;
    phoneNumber: string;
}

export function PersonalInformationCard({
    fullName,
    phoneNumber,
    loading,
    onSave,
}: PersonalInformationCardProps) {
    const [editing, setEditing] = useState(false);

    const [formState, setFormState] = useState<FormState>({
        fullName,
        phoneNumber: phoneNumber ?? "",
    });

    useEffect(() => {
        setFormState({
            fullName,
            phoneNumber: phoneNumber ?? "",
        });
    }, [fullName, phoneNumber]);

    function handleInputChange(field: keyof FormState, value: string) {
        setFormState((prev) => ({ ...prev, [field]: value }));
    }

    function handleCancel() {
        setFormState({
            fullName,
            phoneNumber: phoneNumber ?? "",
        });
        setEditing(false);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        onSave({
            fullName: formState.fullName.trim(),
            phoneNumber: formState.phoneNumber.trim(),
        });

        setEditing(false);
    }

    return (
        <Card className="overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-(--vm-border) px-5 py-4 sm:px-6">
                <div>
                    <h2 className="text-sm font-semibold text-(--vm-text)">
                        Personal information
                    </h2>
                    <p className="mt-0.5 text-xs text-(--vm-muted)">
                        Your basic account information
                    </p>
                </div>

                {!editing ? (
                    <Button
                        type="button"
                        variant="edit"
                        size="xs"
                        onClick={() => setEditing(true)}
                    >
                        <Pencil size={13} />
                        Edit
                    </Button>
                ) : (
                    <span className="rounded-full bg-(--vm-primary)/10 px-2.5 py-1 text-[10px] font-semibold text-(--vm-primary)">
                        Editing
                    </span>
                )}
            </div>

            {editing ? (
                <form onSubmit={handleSubmit} className="p-5 sm:p-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <InputField
                            label="Full name"
                            value={formState.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            icon={<UserRound size={15} />}
                            required
                            maxLength={100}
                            disabled={loading}
                            autoFocus
                        />

                        <InputField
                            label="Phone number"
                            type="tel"
                            value={formState.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            icon={<Phone size={15} />}
                            maxLength={20}
                            placeholder="Add phone number"
                            disabled={loading}
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="cancel"
                            size="xs"
                            onClick={handleCancel}
                            disabled={loading}
                        >
                            <X size={13} />
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="save"
                            size="xs"
                            loading={loading}
                            disabled={loading}
                        >
                            {loading ? (
                                "Saving..."
                            ) : (
                                <>
                                    <Check size={13} />
                                    Save
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
                    <ProfileField label="Full name" value={fullName} />
                    <ProfileField label="Phone number" value={phoneNumber} />
                </div>
            )}
        </Card>
    );
}

interface InputFieldProps extends React.ComponentPropsWithoutRef<"input"> {
    label: string;
    icon: React.ReactNode;
}

function InputField({ label, icon, id, ...inputProps }: InputFieldProps) {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
        <div>
            <label
                htmlFor={inputId}
                className="mb-2 block text-xs font-medium text-(--vm-text)"
            >
                {label}
            </label>

            <div className="relative">
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-(--vm-muted)"
                >
                    {icon}
                </span>

                <input
                    id={inputId}
                    {...inputProps}
                    className="h-10 w-full rounded-xl border border-(--vm-border) bg-(--vm-background) pl-9 pr-3 text-sm text-(--vm-text) outline-none transition placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/15 disabled:opacity-50"
                />
            </div>
        </div>
    );
}
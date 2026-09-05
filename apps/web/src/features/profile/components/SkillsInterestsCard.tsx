import { Check, Heart, Pencil, Plus, X } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useSkillsInterests } from "../hooks/useSkillsInterests";

interface SkillsInterestsCardProps {
  skills: string[];
  interests: string[];
  loading: boolean;
  onSave: (data: { skills: string[]; interests: string[] }) => Promise<void>;
}

export function SkillsInterestsCard({ skills, interests, loading, onSave }: SkillsInterestsCardProps) {
  const {
    editing, localSkills, localInterests, skillInput, interestInput,
    startEditing, cancelEditing, addSkill, addInterest, removeSkill,
    removeInterest, setSkillInput, setInterestInput, save,
  } = useSkillsInterests({ skills, interests, onSave });

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-(--vm-border) px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-sm font-semibold text-(--vm-text)">Skills & interests</h2>
          <p className="mt-0.5 text-xs text-(--vm-muted)">Help your mentor understand what you're working on</p>
        </div>
        {!editing && (
          <Button type="button" variant="edit" size="xs" onClick={startEditing} disabled={loading}>
            <Pencil size={13} /> Edit
          </Button>
        )}
      </div>

      <div className="relative">
        {editing && loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-(--vm-background)/70 backdrop-blur-[2px]">
            <div className="flex items-center gap-2.5 rounded-xl border border-(--vm-border) bg-(--vm-surface) px-4 py-2.5 shadow-sm">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-(--vm-primary)/25 border-t-(--vm-primary)" aria-hidden="true" />
              <span className="text-sm font-medium text-(--vm-text)">Saving changes...</span>
            </div>
          </div>
        )}

        <div className="grid gap-6 p-5 sm:grid-cols-2 sm:p-6">
          <TagGroup
            title="Skills"
            icon={<Plus size={14} />}
            items={editing ? localSkills : skills}
            editing={editing}
            loading={loading}
            input={skillInput}
            onInputChange={setSkillInput}
            onAdd={addSkill}
            onRemove={removeSkill}
          />
          <TagGroup
            title="Interests"
            icon={<Heart size={14} />}
            items={editing ? localInterests : interests}
            editing={editing}
            loading={loading}
            input={interestInput}
            onInputChange={setInterestInput}
            onAdd={addInterest}
            onRemove={removeInterest}
          />
        </div>

        {editing && (
          <div className="flex justify-end gap-2 border-t border-(--vm-border) px-5 py-4 sm:px-6">
            <Button type="button" variant="cancel" size="xs" onClick={cancelEditing} disabled={loading}>
              <X size={13} /> Cancel
            </Button>
            <Button type="button" variant="save" size="xs" onClick={() => void save()} loading={loading} disabled={loading}>
              <Check size={13} /> {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

interface TagGroupProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  editing: boolean;
  loading: boolean;
  input?: string;
  onInputChange?: (value: string) => void;
  onAdd?: () => void;
  onRemove?: (value: string) => void;
}

function TagGroup({
  title, icon, items, editing, loading, input = "", onInputChange, onAdd, onRemove,
}: TagGroupProps) {
  const singularTitle = title.toLowerCase().slice(0, -1);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-(--vm-primary)/10 text-(--vm-primary)">
          {icon}
        </span>
        <span className="text-xs font-semibold text-(--vm-text)">{title}</span>
      </div>

      {editing && onInputChange && onAdd && (
        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (!loading) onAdd();
              }
            }}
            disabled={loading}
            placeholder={`Add ${singularTitle}...`}
            className="h-9 min-w-0 flex-1 rounded-lg border border-(--vm-border) bg-(--vm-background) px-3 text-xs text-(--vm-text) outline-none placeholder:text-(--vm-muted) focus:border-(--vm-primary) focus:ring-2 focus:ring-(--vm-primary)/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
          <Button type="button" variant="primary" size="xs" disabled={loading} onClick={onAdd} className="h-9 w-9 shrink-0 px-0" aria-label={`Add ${title}`}>
            <Plus size={14} />
          </Button>
        </div>
      )}

      <div className={`${editing ? "mt-4" : "mt-3"} flex flex-wrap gap-2`}>
        {items.length > 0 ? (
          items.map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5 rounded-lg border border-(--vm-border) bg-(--vm-surface-2) px-2.5 py-1.5 text-[11px] font-medium text-(--vm-text)">
              {item}
              {editing && onRemove && (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onRemove(item)}
                  aria-label={`Remove ${item}`}
                  className="cursor-pointer text-(--vm-muted) transition-colors hover:text-(--vm-danger) disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={12} />
                </button>
              )}
            </span>
          ))
        ) : (
          <p className="text-xs text-(--vm-muted)">No {title.toLowerCase()} added yet.</p>
        )}
      </div>
    </div>
  );
}
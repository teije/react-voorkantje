export function ToggleButton({
    label,
    enabled,
    onToggleEnabled,
}: {
    label: string;
    enabled?: boolean;
    onToggleEnabled: (value: boolean) => void;
}) {

    return (
        <div>
            <button color="primary" onClick={() => onToggleEnabled(!enabled)}> 
                {label} ({enabled ? "enabled" : "disabled" })
            </button>
        </div>
    );
}
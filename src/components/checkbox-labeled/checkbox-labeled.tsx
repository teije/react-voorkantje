export function CheckboxLabeled({
  label,
  enabled,
  onCheckboxEnabled: onCheckboxEnabled,
}: {
  label: string
  enabled?: boolean
  onCheckboxEnabled: (value: boolean) => void
}) {
  return (
    <label className="checkbox-row">
      <span className="checkbox-label">{label}</span>

      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onCheckboxEnabled(e.target.checked)}
      />

      <span className="checkmark" />
    </label>
  )
}

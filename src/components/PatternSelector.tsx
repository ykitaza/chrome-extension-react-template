interface PatternSelectorProps {
    id: string;
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    disabled?: boolean;
}

export const PatternSelector = ({
    id,
    label,
    value,
    options,
    onChange,
    disabled = false
}: PatternSelectorProps) => (
    <div className="select-group">
        <label htmlFor={id}>{label}</label>
        <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
        >
            {options.map(pattern => (
                <option key={pattern} value={pattern}>
                    {pattern}
                </option>
            ))}
        </select>
    </div>
); 
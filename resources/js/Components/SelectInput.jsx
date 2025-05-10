import { forwardRef } from 'react';
import InputLabel from './InputLabel'; // Pastikan untuk import InputLabel

export default forwardRef(function SelectInput(
    {
        label,
        options = [],
        name,
        value,
        onChange,
        valueset,
        multiple = false,
        className = '',
        ...props
    },
    ref,
) {
    return (
        <div className={className}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                multiple={multiple}
                ref={ref}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...props}
            >
                <option value="">{valueset}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
});

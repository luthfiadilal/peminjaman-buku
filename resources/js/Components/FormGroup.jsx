import InputError from './InputError';

export default function FormGroup({ label, children, error }) {
    return (
        <div>
            <label className="mb-1 block font-medium">{label}</label>
            {children}
            {error && <InputError message={error} />}
        </div>
    );
}

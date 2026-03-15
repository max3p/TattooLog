import { Input } from '@/components/ui/input';

interface SearchFormProps {
  value: string;
  onChange: (query: string) => void;
}

export function SearchForm({ value, onChange }: SearchFormProps) {
  return (
    <div className="w-full max-w-md">
      <Input
        type="text"
        placeholder="Search by name, phone, or email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
    </div>
  );
}

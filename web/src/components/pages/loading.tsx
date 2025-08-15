import { LoaderCircleIcon } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <LoaderCircleIcon className="w-12 h-12 animate-spin" />
    </div>
  );
}

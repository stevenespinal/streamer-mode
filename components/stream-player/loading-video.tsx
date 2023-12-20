import { Loader } from "lucide-react";
interface LoadingVideoProps {
  label: string;
}
export const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="flex flex-col h-full space-y-4 justify-center items-center">
      <Loader className="h-10 w-10 text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};

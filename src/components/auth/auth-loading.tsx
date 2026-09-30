import { LoaderIcon } from "lucide-react";

export const AuthLoading = ({
  label = "Verifying account",
}: {
  label?: string;
}) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-3">
        <LoaderIcon className="size-6 animate-spin" />
        {label}
      </div>
    </div>
  );
};

export default AuthLoading;

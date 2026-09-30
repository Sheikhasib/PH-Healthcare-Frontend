"use client";

// import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GoogleLoginComponent() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google login failed. Please try again.");
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.success("Google login successful.");
          router.push("/");
        },
        onError: (err) => {
          toast.error(err.message || "Something went wrong. Please try again.");
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />
  );
}

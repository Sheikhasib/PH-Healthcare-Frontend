"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useVerifyAccount, useVerifyDoctorAccount } from "@/hooks";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const RESEND_COOLDOWN = 120;

export const VerifyAccountForm = ({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  // Use the custom hook to handle account verification and resend
  // const { mutate: verify, isPending: verifyPending } = useVerifyAccount();

  // Use the custom hook to handle doctor account verification
  const { mutate: verifyPatient } = useVerifyAccount();

  // Use the custom hook to handle doctor account verification
  const { mutate: verifyDoctor } = useVerifyDoctorAccount();

  // Determine which verification function to use based on the mode
  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  // Get the email from the query parameters
  const email = String(searchParams.get("email"));

  // Redirect to home page if email is not present
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  // Start the resend timer countdown when the component mounts
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // Handle the OTP submission and verification
  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    // Prepare the verification data and call the verify mutation
    const verifyData = {
      email,
      otp,
    };

    // Call the verify mutation and handle success and error responses
    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error("Server Failure", {
            description: "Something went wrong. Please try again",
          });
        }

        // Show different success messages based on the mode (doctor)
        if (mode === "doctor") {
          toast.success("Verification Successful", {
            description:
              "An admin will approve your account. This may take time. Please check your email in few days",
          });
          router.push("/");

          return;
        }

        toast.success("Verification Successful", {
          description: "Welcome onboard! You can now login to your account",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.error("Verification failure", {
          description: err.message || "Something went wrong. Please try again",
        });
      },
    });
  };

  // If the email is not present, return null to avoid rendering the form
  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we send you in your email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
            <FieldDescription>Resend in {resendTimer}</FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={resendTimer > 0}>Resend</Button>
        <Button type="submit" form="otp-form">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
};

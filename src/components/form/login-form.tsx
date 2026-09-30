"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import Link from "next/link";

export default function LoginForm() {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Use the useLogin hook to get the login mutation function and its state
  const { mutate: login, isPending: loginPending } = useLogin();

  // Initialize the form with default values and validation schema
  const form = useForm({
    // defaultValues are the initial values of the form fields
    defaultValues: {
      email: "sheikhhasib037@gmail.com",
      password: "mHl$bB?S6N",
    },
    // validators is an object that defines the validation rules for the form fields
    validators: {
      onSubmit: loginSchema,
    },
    // onSubmit is called when the form is submitted and the validation passes
    onSubmit: ({ value }) => {
      // Create a loginData object with the form values
      const loginData = {
        email: value.email,
        password: value.password,
      };
      // Call the login mutation with the form values and handle success and error
      login(loginData, {
        onSuccess: (res) => {
          console.log(res);
          toast.success("Login successful.");
          router.push("/");
        },
        // onError is called when the mutation fails
        onError: (err) => {
          console.log(err);
          toast.error(err.message || "Something went wrong. Please try again.");
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              // isInvalid is true if the field has been touched and is not valid m
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    value={field.state.value}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button disabled={loginPending} type="submit">
            {loginPending ? (
              <>
                {" "}
                <Spinner /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or</FieldSeparator>

      <GoogleLoginComponent></GoogleLoginComponent>

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

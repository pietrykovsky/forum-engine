"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Spinner } from "@/components/spinner";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: async () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full" {...(loading ? { disabled: true } : {})}>
                  {loading ? <Spinner size="md" className="text-white m-1" /> : "Login"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    await signIn.social({
                      provider: "google",
                      callbackURL: "/",
                    });
                  }}
                >
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Register
                </a>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { passwordResetSendSchema } from "@/validationSchemas/userSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {};

export default function PasswordResetSend({}: Props) {
  const router = useRouter();

  const form = useForm<Yup.InferType<typeof passwordResetSendSchema>>({
    resolver: yupResolver(passwordResetSendSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: Yup.InferType<typeof passwordResetSendSchema>) {
    console.log(values);
    router.push("/passwordReset/reset/tywuyertuwehjdwhebdjh");
  }

  return (
    <Card className="w-[25rem]">
      <CardHeader>
        <CardTitle className="text-center">Password Reset</CardTitle>
        <CardDescription className="text-center">
          We will send you an email once submit
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Send Reset Email
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

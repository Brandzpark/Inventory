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
import { passwordResetSchema } from "@/validationSchemas/userSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
type Props = {
  params: { token: string };
};

export default function page({ params }: Props) {
  const form = useForm<Yup.InferType<typeof passwordResetSchema>>({
    resolver: yupResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
  });

  function onSubmit(values: Yup.InferType<typeof passwordResetSchema>) {
    console.log(values);
  }

  return (
    <Card className="w-[25rem]">
      <CardHeader>
        <CardTitle className="text-center">Password Reset</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password Confirmation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

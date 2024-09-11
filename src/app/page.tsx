"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validationSchemas/userSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { loginApi } from "@/api/public";
import { setCookie, getCookie } from "cookies-next";
import { AxiosResponse } from "axios";
import { errorHandler } from "@/lib/helpers";

export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const form = useForm<Yup.InferType<typeof loginSchema>>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: Yup.InferType<typeof loginSchema>) {
    setLoading(true);
    try {
      const response: AxiosResponse = await loginApi(values);
      setCookie("token", response?.data?.token,{maxAge: 5000000});
      setLoading(false);
      router.replace("/dashboard");
    } catch (error) {
      setLoading(false);
      errorHandler({
        error,
        setError: (property, options) => form.setError(property, options),
      });
    }
  }

  return (
    <Card className="w-[26rem]">
      <CardHeader>
        <CardTitle className="text-center">Login</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              disabled={loading}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              disabled={loading}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href={"/passwordReset/send"}
              className="text-sm text-blue-900 text-right"
            >
              Forgot Password
            </Link>
          </CardContent>
          <CardFooter>
            <Button disabled={loading}>Login</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

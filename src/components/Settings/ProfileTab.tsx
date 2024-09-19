import React, { useContext, useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import {
  passwordChangeSchema,
  profileUpdateSchema,
} from "@/validationSchemas/userSchemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import ProfileImagePicker from "../ProfileImagePicker";
import { MainContext } from "@/lib/MainContext";
import { errorHandler } from "@/lib/helpers";
import { passwordChangeApi, updateUserBaseApi } from "@/api/user";
import { toast } from "sonner";

type Props = {};

export default function ProfileTab({}: Props) {
  const { userData } = useContext(MainContext);
  const [loading, setloading] = useState(false);
  const userUpdateForm = useForm<Yup.InferType<typeof profileUpdateSchema>>({
    resolver: yupResolver(profileUpdateSchema),
    values: {
      firstName: userData?.firstName ?? "",
      lastName: userData?.lastName ?? "",
      email: userData?.email ?? "",
      image: userData?.image ?? null,
    },
  });

  async function onSubmit(values: Yup.InferType<typeof profileUpdateSchema>) {
    setloading(true);
    try {
      const { data } = await updateUserBaseApi({ ...userData, ...values });
      toast.success("User Updated");
      setloading(false);
    } catch (error) {
      setloading(false);
      errorHandler({
        error,
        setError: (property, object) =>
          userUpdateForm.setError(property, object),
      });
    }
  }

  const passwordChangeForm = useForm<
    Yup.InferType<typeof passwordChangeSchema>
  >({
    resolver: yupResolver(passwordChangeSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      passwordConfirmation: "",
    },
  });

  async function onPasswordChangeSubmit(
    values: Yup.InferType<typeof passwordChangeSchema>
  ) {
    setloading(true);
    try {
      const { data } = await passwordChangeApi(values);
      toast.success("Password Changed");
      passwordChangeForm.reset();
      setloading(false);
    } catch (error) {
      setloading(false);
      errorHandler({
        error,
        setError: (property, object) =>
          passwordChangeForm.setError(property, object),
      });
    }
  }

  return (
    <TabsContent value="profile" className="grid gap-5 lg:w-3/4">
      <Card>
        <CardContent className="py-5">
          <Label className="text-base">Personal Information</Label>
          <Form {...userUpdateForm}>
            <form
              encType="multipart/form-data"
              onSubmit={userUpdateForm.handleSubmit(onSubmit)}
            >
              <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <FormField
                  disabled={loading}
                  control={userUpdateForm.control}
                  name="image"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <ProfileImagePicker
                          disabled={field.disabled}
                          error={fieldState.error ? true : false}
                          onChange={(file) => field.onChange(file)}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="hidden lg:block"></div>
                <FormField
                  disabled={loading}
                  control={userUpdateForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={userUpdateForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={loading}
                  control={userUpdateForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end items-center mt-5">
                <Button disabled={loading} type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-5">
          <Label className="text-base">Change Password</Label>
          <Form {...passwordChangeForm}>
            <form
              onSubmit={passwordChangeForm.handleSubmit(onPasswordChangeSubmit)}
            >
              <div className="grid lg:grid-cols-2 gap-5 mt-5">
                <FormField
                  disabled={loading}
                  control={passwordChangeForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Current Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="hidden lg:block"></div>
                <FormField
                  disabled={loading}
                  control={passwordChangeForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
                  disabled={loading}
                  control={passwordChangeForm.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Confirmation</FormLabel>
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
              </div>
              <div className="flex justify-end items-center mt-5">
                <Button disabled={loading} type="submit">
                  Change Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import type { InitData } from "@/lib/types";
import { Spinner } from "@/components/ui/spinner";


interface ApiResponse {
  identifier: string;
}

interface UserDataProps {
  userData: InitData | null;
  loading: boolean;
  formatAuthDate: (auth_date: string | null | undefined) => string;
}


const formSchema = z.object({
  meetingName: z.string(),
  meetingDescription: z.string().optional(),
  userData: z.any(),

});

export function MeetingForm({userData, loading, formatAuthDate}: UserDataProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingName: "New Meeting",
      meetingDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.userData = userData;
    
    try {
      const response = await fetch("/api/createMeeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create meeting");
      }

      const result = await response.json() as ApiResponse;

      router.push(`/pick-dates/${result.identifier}`);;
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  }
  if (loading) {
    return <Spinner />;
  }

  if (!userData) {
    return <h1>No user data available</h1>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="justify-top w-full max-w-sm space-y-8 p-10"
      >
        <FormField
          control={form.control}
          name="meetingName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Name</FormLabel>
              <FormControl>
                <Input placeholder="New Meeting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="meetingDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Description</FormLabel>
              <FormControl>
                <Input placeholder="Optional" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <input type="hidden" {...form.register("userData")} />

        <Button className="w-full bg-blue-800" type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
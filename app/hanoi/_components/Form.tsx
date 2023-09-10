"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHeight } from "../_states/height";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export const schema = z.object({
  height: z.number().min(1).max(10),
});
export type Type = z.infer<typeof schema>;

export default function Form() {
  const { setHeight } = useHeight();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Type>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setHeight(data.height);
      })}
      className="flex justify-around my-5"
    >
      <Input
        type="number"
        label="height"
        placeholder="height"
        defaultValue="3"
        {...register("height", {
          required: "This is required",
          valueAsNumber: true,
        })}
        errorMessage={errors.height && errors.height.message}
      />
      <Button isLoading={isSubmitting} type="submit" className="m-2">
        決定
      </Button>
    </form>
  );
}

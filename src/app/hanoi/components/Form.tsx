"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHeight } from "../states/height";

export const schema = z.object({
  height: z.number().min(1).max(10),
});
export type Type = z.infer<typeof schema>;

export default function Form() {
  const { setHeight } = useHeight();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Type>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        setHeight(data.height);
      })}
      className="flex justify-center w-1/2 bg-gray-200 p-5 mt-5"
    >
      <label htmlFor="hanoi-height">高さ</label>
      <input
        id="hanoi-height"
        type="number"
        defaultValue={3}
        {...register("height", { required: true, valueAsNumber: true })}
      />
      {errors.height && <span>{errors.height.message}</span>}

      <button type="submit">送信</button>
    </form>
  );
}

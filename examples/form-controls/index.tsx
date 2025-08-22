"use client";
import { CheckboxFormField } from "@/registry/new-york/form-controls/checkbox-form-field";
import { DatePickerFormField } from "@/registry/new-york/form-controls/date-picker-form-field";
import { InputFormField } from "@/registry/new-york/form-controls/input-form-field";
import { NumberInputFormField } from "@/registry/new-york/form-controls/number-input-form-field";
import { SelectFormField } from "@/registry/new-york/form-controls/select-form-field";
import { TextareaFormField } from "@/registry/new-york/form-controls/textarea-form-field";
import { Form } from "@/registry/new-york/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const FormControlsExample = () => {
   const formSchema = z.object({
      name: z.string().min(1),
      age: z.number().int(),
      gender: z.enum(["male", "female", "trans", "non-binary"]),
      emotion: z.enum(["happy", "ok", "angry", "sad"]),
      notes: z.string(),
      inSchool: z.boolean(),
      graduationDate: z.date().nullable(),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         name: "",
         age: 18,
         gender: "female",
         emotion: "happy",
         notes: "",
         inSchool: false,
         graduationDate: null,
      },
   });

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(values);
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full px-4"
         >
            <InputFormField
               reactHookForm={form}
               name="name"
               label="Name"
               required
               placeholder="Your Name"
            />
            <NumberInputFormField
               reactHookForm={form}
               name="age"
               label="Age"
               required
            />
            <CheckboxFormField
               reactHookForm={form}
               name="inSchool"
               required
               label="In School"
               labelPosition="right"
            />
            <DatePickerFormField
               reactHookForm={form}
               name="graduationDate"
               label="Graduation Date"
               allowClear
            />
            <SelectFormField
               reactHookForm={form}
               name="gender"
               label="Gender"
               required
               options={[
                  {
                     type: "item",
                     value: "male",
                     label: "Male",
                  },
                  {
                     type: "item",
                     value: "female",
                     label: "Female",
                  },
                  {
                     type: "item",
                     value: "trans",
                     label: "Trans",
                  },
                  {
                     type: "item",
                     value: "non-binary",
                     label: "Non-Binary",
                  },
               ]}
            />
            <SelectFormField
               reactHookForm={form}
               name="emotion"
               label="Emotion"
               required
               options={[
                  {
                     type: "group",
                     label: "Positive",
                     items: [
                        {
                           type: "item",
                           value: "happy",
                           label: "Happy",
                        },
                        {
                           type: "item",
                           value: "ok",
                           label: "OK",
                        },
                     ],
                  },
                  {
                     type: "group",
                     label: "Negative",
                     items: [
                        {
                           type: "item",
                           value: "angry",
                           label: "Angry",
                        },
                        {
                           type: "item",
                           value: "sad",
                           label: "Sad",
                        },
                     ],
                  },
               ]}
            />
            <TextareaFormField
               reactHookForm={form}
               name="notes"
               label="Notes"
               className="min-h-[200px]"
               placeholder="Notes..."
            />
         </form>
      </Form>
   );
};

<script setup>
import Input from "./Input.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { toRaw } from "vue";
import { useStorage } from "@vueuse/core";

const personalInfo = useStorage("personalInfo", {}, sessionStorage);

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  career: yup.string().required("Career title is required"),
  address: yup.string().required("Address is required"),
  about: yup.string().required("About you is required"),
});
const { validate, values } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: personalInfo.value || {},
});

const submitForm = async () => {
  const isValid = await validate();
  if (isValid) {
    personalInfo.value = toRaw(values);
  }
  return isValid;
};

defineExpose({
  submitForm,
});
</script>

<template>
  <form class="w-[80%]">
    <div class="flex flex-wrap items-center gap-6">
      <Input class="flex-1" name="firstName" label="First Name" />
      <Input class="flex-1" name="lastName" label="Last name" />
    </div>
    <Input name="email" label="email" />
    <Input name="phone" label="Phone number" />
    <div class="flex flex-wrap items-center gap-6">
      <Input class="flex-1" name="career" label="Career Title" />
      <Input class="flex-1" name="address" label="Address" />
    </div>
    <Input name="about" label="About you" type="textarea" />
  </form>
</template>

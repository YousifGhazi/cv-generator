<script setup>
import Input from "./Input.vue";
import * as yup from "yup";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { toRaw } from "vue";
import { useStorage } from "@vueuse/core";

const schema = yup.object({
  education: yup.array().of(
    yup.object({
      institution: yup.string().required("Institution is required"),
      startDate: yup.string().required("Start date is required"),
      endDate: yup.string().required("End date is required"),
    })
  ),
});

const education = useStorage("education", [], sessionStorage);

const defaultValue = {
  institution: "",
  startDate: "",
  endDate: "",
};

const { values, validate } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    education: education.value?.length > 0 ? education.value : [defaultValue],
  },
});

const { remove, push, fields } = useFieldArray("education");

const submitForm = async () => {
  const isValid = await validate();
  if (isValid) {
    education.value = toRaw(values.education);
  }
  return isValid;
};

defineExpose({
  submitForm,
});
</script>

<template>
  <form class="w-[80%]">
    <div
      v-for="(education, index) in fields"
      :key="education.key"
      class="relative group"
    >
      <Input
        :name="`education.${index}.institution`"
        label="University/School Name"
        class="flex-1"
      />
      <div class="flex flex-wrap items-center sm:gap-6">
        <Input
          :name="`education.${index}.startDate`"
          type="date"
          label="Start date"
          class="flex-1"
        />
        <Input
          :name="`education.${index}.endDate`"
          type="date"
          class="flex-1"
          label="End date"
        />
        <i
          v-if="index > 0"
          @click="remove(index)"
          class="pi pi-times p-2 absolute top-0 right-0 translate-x-[120%] ms-auto text-red-500 rounded-md opacity-0 group-hover:bg-red-50 group-hover:opacity-100 cursor-pointer duration-200"
        ></i>
      </div>
    </div>
    <div class="flex">
      <i
        @click="push(defaultValue)"
        class="pi pi-plus ms-auto text-primary border-2 border-primary p-2 rounded-md cursor-pointer"
      ></i>
    </div>
  </form>
</template>

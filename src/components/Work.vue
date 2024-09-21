<script setup>
import Input from "./Input.vue";
import * as yup from "yup";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { useStorage } from "@vueuse/core";
import { toRaw } from "vue";

const schema = yup.object({
  work: yup.array().of(
    yup.object({
      company: yup.string().required("Company is required"),
      startDate: yup.string().required("Start date is required"),
      endDate: yup.string().required("End date is required"),
    })
  ),
});

const defaultValue = {
  company: "",
  startDate: "",
  endDate: "",
};

const work = useStorage("work", [], sessionStorage);

const { values, validate } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    work: work.value?.length > 0 ? work.value : [defaultValue],
  },
});

const { remove, push, fields } = useFieldArray("work");

const submitForm = async () => {
  const isValid = await validate();
  if (isValid) {
    work.value = toRaw(values.work);
  }
  return isValid;
};

defineExpose({
  submitForm,
});
</script>

<template>
  <form class="w-[80%]">
    <div v-for="(work, index) in fields" :key="work.key" class="relative group">
      <Input
        :name="`work.${index}.company`"
        label="Company Name"
        class="flex-1"
      />
      <div class="flex flex-wrap items-center sm:gap-6">
        <Input
          :name="`work.${index}.startDate`"
          type="date"
          label="Start date"
          class="flex-1 w-[100%]"
        />
        <Input
          :name="`work.${index}.endDate`"
          type="date"
          class="flex-1 w-[100%]"
          label="End date"
        />
      </div>
      <div class="flex mb-3"></div>
      <i
        v-if="index > 0"
        @click="remove(index)"
        class="pi pi-times p-2 absolute top-0 right-0 translate-x-[120%] ms-auto text-red-500 rounded-md opacity-0 group-hover:bg-red-50 group-hover:opacity-100 cursor-pointer duration-200"
      ></i>
    </div>
    <div class="flex">
      <i
        @click="push(defaultValue)"
        class="pi pi-plus ms-auto text-primary border-2 border-primary p-2 rounded-md cursor-pointer"
      ></i>
    </div>
  </form>
</template>

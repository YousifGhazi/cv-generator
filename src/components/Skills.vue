<script setup>
import Input from "./Input.vue";
import * as yup from "yup";
import { useForm, useFieldArray } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { useStorage } from "@vueuse/core";
import { toRaw } from "vue";

const schema = yup.object({
  skills: yup.array().of(
    yup.object({
      skill: yup.string().required("skill is required"),
    })
  ),
});
const skills = useStorage("skills", [], sessionStorage);

const defaultValue = {
  skill: "",
};

const { values, validate } = useForm({
  validationSchema: toTypedSchema(schema),
  initialValues: {
    skills: skills.value?.length > 0 ? skills.value : [defaultValue],
  },
});

const { remove, push, fields } = useFieldArray("skills");

const submitForm = async () => {
  const isValid = await validate();
  if (isValid) {
    skills.value = toRaw(values.skills);
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
      v-for="(skills, index) in fields"
      :key="skills.key"
      class="relative group"
    >
      <Input :name="`skills.${index}.skill`" label="Skill" class="flex-1" />
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

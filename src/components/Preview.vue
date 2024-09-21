<script setup>
import { useStorage } from "@vueuse/core";
const personalInfo = useStorage("personalInfo", {}, sessionStorage);
const education = useStorage("education", [], sessionStorage);
const work = useStorage("work", [], sessionStorage);
const skills = useStorage("skills", [], sessionStorage);
</script>

<template>
  <div
    id="cv-preview"
    class="border-2 text-[12px] md:text-[18px] border-gray-500 text-black w-[100%] p-4 mx-auto aspect-[1/1.41]"
  >
    <div class="flex py-2 justify-between border-b-2">
      <div>
        <h2 class="text-3xl font-bold capitalize">
          {{ personalInfo.firstName }} {{ personalInfo.lastName }}
        </h2>
        <p class="text-[1.125em]">{{ personalInfo.career }}</p>
      </div>
      <div>
        <p>{{ personalInfo.phone }}</p>
        <p>{{ personalInfo.email }}</p>
        <p>{{ personalInfo.address }}</p>
      </div>
    </div>
    <div class="py-2">
      <h3 class="text-[2.25em] py-2 font-bold">About</h3>
      <p>{{ personalInfo.about }}</p>
    </div>
    <div class="py-2">
      <h3 class="text-[2.25em] py-2 font-bold">Education</h3>
      <ul>
        <li class="text-[1.125em]" v-for="edu in education" :key="edu.id">
          <p>{{ edu.institution }}</p>
          <p>{{ edu.degree }}</p>
          <p>{{ edu.startDate }} / {{ edu.endDate }}</p>
        </li>
      </ul>
    </div>
    <div class="py-2">
      <h3 class="text-[2.25em] py-2 font-bold">Work Experience</h3>
      <ul>
        <li class="text-[1.125em]" v-for="job in work" :key="job.id">
          <p>{{ job.company }}</p>
          <p>{{ job.position }}</p>
          <p>{{ job.startDate }} / {{ job.endDate }}</p>
        </li>
      </ul>
    </div>
    <div class="py-2">
      <h3 class="text-[2.25em] py-2 font-bold">Skills</h3>
      <ul class="list-disc px-5">
        <li class="text-[1.125em]" v-for="skill in skills" :key="skill.id">
          <p>{{ skill.skill }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

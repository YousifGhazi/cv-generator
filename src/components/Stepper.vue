<script setup>
import Stepper from "primevue/stepper";
import StepList from "primevue/steplist";
import StepPanels from "primevue/steppanels";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import Button from "primevue/button";
import { computed, ref } from "vue";
import PersonalInfo from "./PersonalInfo.vue";
import Education from "./Education.vue";
import Work from "./Work.vue";
import Preview from "./Preview.vue";
import Skills from "./Skills.vue";
import html2pdf from "html2pdf.js";

const activeStep = ref(1);
const activePanelRef = ref(null);

const sections = computed(() => [
  { title: "Personal Information" },
  { title: "Education" },
  { title: "Work Experience" },
  { title: "Skills" },
  { title: "Preview" },
]);

const handleNextStep = async () => {
  if (activeStep.value === sections.value.length) {
    downloadPdf();
    return;
  }
  const { valid } = await activePanelRef.value.submitForm();
  if (valid) {
    activeStep.value += 1;
  }
};
const handlePreviousStep = () => {
  activeStep.value -= 1;
};

const downloadPdf = () => {
  const element = document.getElementById("cv-preview");
  const opt = {
    filename: "myCV.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
  };
  html2pdf().from(element).set(opt).save();
};
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <h2
      class="text-center my-14 px-2 font-bold text-3xl sm:text-4xl text-black"
    >
      {{ sections[activeStep - 1].title }}
    </h2>
    <Stepper
      liner
      v-model:value="activeStep"
      value="1"
      class="flex flex-col flex-1 w-[95%] sm:w-[90%] max-w-[60rem]"
    >
      <StepList class="mb-2">
        <Step
          v-for="(section, index) in sections"
          :key="index"
          :value="index + 1"
          v-slot="{ activateCallback, value, a11yAttrs }"
          asChild
        >
          <div
            :class="[
              'flex flex-row',
              { 'flex-auto': index < sections.length - 1 },
            ]"
            v-bind="a11yAttrs.root"
          >
            <div class="flex flex-col items-center text-center">
              <button
                class="bg-transparent border-0 inline-flex flex-col px-2 sm:px-5"
                @click="activateCallback"
                v-bind="a11yAttrs.header"
              >
                <span
                  :class="[
                    ' rounded-full font-bold text-lg sm:text-xl border-2 aspect-square h-8 sm:h-12 inline-flex items-center justify-center duration-500',
                    {
                      ' text-primary-contrast border-primary ':
                        value <= activeStep,
                      'bg-surface-200 border-surface-400 text-slate-400':
                        value > activeStep,
                      'bg-primary  text-white': value === activeStep,
                    },
                  ]"
                >
                  {{ value }}
                </span>
              </button>
            </div>
            <div
              :class="[
                'hidden sm:block flex-1 h-2 my-auto rounded-lg mx-2  bg-gray-300 duration-500',
                { '!bg-primary': value < activeStep },
              ]"
            ></div>
          </div>
        </Step>
      </StepList>
      <StepPanels class="flex flex-1">
        <StepPanel
          :value="activeStep"
          class="flex flex-col flex-1 bg-transparent"
        >
          <div
            class="flex-1 flex p-4 border-surface-200 rounded justify-center items-top"
          >
            <PersonalInfo v-if="activeStep === 1" ref="activePanelRef" />
            <Education v-if="activeStep === 2" ref="activePanelRef" />
            <Work v-if="activeStep === 3" ref="activePanelRef" />
            <Skills v-if="activeStep === 4" ref="activePanelRef" />
            <Preview v-if="activeStep === 5" />
          </div>
          <div class="flex justify-between font-medium p-4 bg-transparent">
            <Button
              v-if="activeStep > 1"
              label="Back"
              severity="secondary"
              class="px-8"
              @click="handlePreviousStep"
            />
            <Button
              :label="activeStep === sections.length ? 'Download' : 'Next'"
              type="submit"
              serverity="primary"
              iconPos="right"
              class="ms-auto text-white px-8"
              @click="handleNextStep"
            />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

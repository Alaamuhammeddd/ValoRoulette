<template>
  <div>
    <VueWheelSpinner
      ref="spinner"
      class="spinner"
      :slices="wheelStore.slices"
      :winner-index="wheelStore.defaultWinner"
      :cursor-angle="cursorAngle"
      :cursor-position="cursorPosition"
      :cursor-distance="cursorDistance"
      @spin-start="onSpinStart"
      @spin-end="onSpinEnd"
    >
      <template #cursor>
        <img class="cursor-img" :src="cursorImage" alt="Cursor" />
      </template>

      <template #default>
        <button
          class="spin-button"
          :disabled="wheelStore.isSpinning"
          @click="handleSpinButtonClick"
        >
          Spin
        </button>
      </template>
    </VueWheelSpinner>

    <div
      v-if="wheelStore.showPopup"
      class="popup-overlay"
      @click.self="wheelStore.closePopup"
    >
      <div class="popup-content">
        <h2>🎉 You got:</h2>
        <div class="popup-result">
          <div>
            <p>{{ wheelStore.winnerResult?.text }}</p>
            <div v-if="randomAgent">
              <p>Agent: {{ randomAgent.name }}</p>
              <img
                :src="randomAgent.image"
                :alt="randomAgent.name"
                class="role-image"
              />
            </div>
          </div>
          <img
            v-if="wheelStore.winnerResult?.role"
            :src="wheelStore.winnerResult.role"
            alt="Role Image"
            class="role-image"
          />
        </div>
        <button @click="wheelStore.closePopup">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import VueWheelSpinner from "vue-wheel-spinner";
import cursorImage from "../assets/vue.svg";
import { useWheelStore } from "../stores/wheelStore";

const spinner = ref<InstanceType<typeof VueWheelSpinner> | null>(null);
const wheelStore = useWheelStore();

const cursorAngle = ref(0);
const cursorPosition = ref<"center" | "edge">("edge");
const cursorDistance = ref(0);

// Store the random agent for the winner
import type { Agent } from "../types/slice";
const randomAgent = ref<Agent | null>(null);

function getRandomAgent(agents: Agent[]): Agent | null {
  if (!agents || agents.length === 0) return null;
  const idx = Math.floor(Math.random() * agents.length);
  return agents[idx];
}

function handleSpinButtonClick() {
  const index = wheelStore.spin();
  spinner.value?.spinWheel(index);
}

function onSpinStart() {
  wheelStore.startSpin();
  randomAgent.value = null;
}

function onSpinEnd(winnerIndex: number) {
  wheelStore.endSpin(winnerIndex);

  const winner = wheelStore.slices[winnerIndex];
  randomAgent.value =
    winner && winner.agents ? getRandomAgent(winner.agents) : null;
}
watch(randomAgent, (newVal) => {
  console.log("Random agent selected:", newVal);
});
</script>

<style scoped>
.spinner {
  max-width: 550px;
  width: 100%;
  margin: 2rem auto;
  font-size: 24px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cursor-img {
  width: 40px;
  aspect-ratio: 1 / 1;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.2));
}

.spin-button {
  width: 120px;
  height: 120px;
  font-size: 22px;
  cursor: pointer;
  background: linear-gradient(135deg, #eb4d4b, #f0932b);
  color: white;
  border: 8px solid white;
  border-radius: 50%;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2),
    inset -3px -3px 5px rgba(255, 255, 255, 0.2),
    inset 3px 3px 5px rgba(0, 0, 0, 0.2);
  transition: all 250ms ease;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  position: relative;
  z-index: 11;
}

.spin-button:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3),
    inset -2px -2px 4px rgba(255, 255, 255, 0.2),
    inset 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.spin-button:active {
  transform: scale(0.96);
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
    inset -2px -2px 5px rgba(255, 255, 255, 0.1);
}

.spin-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
  transform: none;
}

.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.3s ease-in-out;
}

.popup-content {
  background: grey;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  max-width: 400px;
  width: 90%;
  animation: slideUp 0.3s ease-in-out;
  position: relative;
}

.popup-content h2 {
  font-size: 28px;
  margin-bottom: 1rem;
  color: #333;
}

.popup-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.popup-result p {
  font-size: 22px;
  font-weight: 600;
  color: #444;
}

.popup-result img {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.popup-content button {
  margin-top: 2rem;
  padding: 10px 20px;
  background: linear-gradient(135deg, #f0932b, #eb4d4b);
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.popup-content button:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #e17055, #d63031);
}

.popup-content button:active {
  transform: scale(0.97);
}

@keyframes fadeIn {
  from {
    background: rgba(0, 0, 0, 0);
  }
  to {
    background: rgba(0, 0, 0, 0.6);
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.popup-result {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  gap: 1rem;
  margin-top: 1rem;
}

.role-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
}
</style>

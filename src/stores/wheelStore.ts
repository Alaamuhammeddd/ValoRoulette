import { defineStore } from "pinia";
import { ref } from "vue";

// Role icons
import controller from "../assets/roles/controller.png";
import duelist from "../assets/roles/duelist.png";
import initiator from "../assets/roles/initiator.png";
import sentinel from "../assets/roles/sentinel.png";

// Agent images (Controller)
import brimstone from "../assets/images/brimstone.png";
import omen from "../assets/images/omen.png";
import viper from "../assets/images/viper.png";
import astra from "../assets/images/astra.png";
import harbor from "../assets/images/harbor.png";
import clove from "../assets/images/clove.png";

// Agent images (Duelist)
import jett from "../assets/images/jett.png";
import phoenix from "../assets/images/phoenix.png";
import raze from "../assets/images/raze.png";
import reyna from "../assets/images/reyna.png";
import yoru from "../assets/images/yoru.png";
import neon from "../assets/images/neon.png";
import iso from "../assets/images/iso.png";

// Agent images (Initiator)
import sova from "../assets/images/sova.png";
import skye from "../assets/images/skye.png";
import breach from "../assets/images/breach.png";
import kayo from "../assets/images/kayo.png";
import fade from "../assets/images/fade.png";
import gekko from "../assets/images/gekko.png";

// Agent images (Sentinel)
import sage from "../assets/images/sage.png";
import cypher from "../assets/images/cypher.png";
import killjoy from "../assets/images/killjoy.png";
import chamber from "../assets/images/chamber.png";
import deadlock from "../assets/images/deadlock.png";

import type { Slice } from "../types/slice";

export const useWheelStore = defineStore("wheel", () => {
  const slices = ref<Slice[]>([
    {
      color: "#6C5CE7", // soft purple
      text: "Controller",
      role: controller,
      agents: [
        { name: "Brimstone", image: brimstone },
        { name: "Omen", image: omen },
        { name: "Viper", image: viper },
        { name: "Astra", image: astra },
        { name: "Harbor", image: harbor },
        { name: "Clove", image: clove },
      ],
    },
    {
      color: "#00B894", // teal green
      text: "Duelist",
      role: duelist,
      agents: [
        { name: "Jett", image: jett },
        { name: "Phoenix", image: phoenix },
        { name: "Raze", image: raze },
        { name: "Reyna", image: reyna },
        { name: "Yoru", image: yoru },
        { name: "Neon", image: neon },
        { name: "Iso", image: iso },
      ],
    },
    {
      color: "#E17055", // warm orange
      text: "Initiator",
      role: initiator,
      agents: [
        { name: "Sova", image: sova },
        { name: "Skye", image: skye },
        { name: "Breach", image: breach },
        { name: "KAY/O", image: kayo },
        { name: "Fade", image: fade },
        { name: "Gekko", image: gekko },
      ],
    },
    {
      color: "#0984E3", // vibrant blue
      text: "Sentinel",
      role: sentinel,
      agents: [
        { name: "Sage", image: sage },
        { name: "Cypher", image: cypher },
        { name: "Killjoy", image: killjoy },
        { name: "Chamber", image: chamber },
        { name: "Deadlock", image: deadlock },
      ],
    },
  ]);

  const isSpinning = ref(false);
  const showPopup = ref(false);
  const winnerResult = ref<Slice | null>(null);
  const defaultWinner = ref<number | null>(null);

  function spin(): number {
    const randomIndex = Math.floor(Math.random() * slices.value.length);
    defaultWinner.value = randomIndex;
    return randomIndex;
  }

  function startSpin() {
    isSpinning.value = true;
    showPopup.value = false;
    winnerResult.value = null;
  }

  function endSpin(winnerIndex: number) {
    isSpinning.value = false;
    winnerResult.value = slices.value[winnerIndex];
    showPopup.value = true;
  }

  function closePopup() {
    showPopup.value = false;
  }

  return {
    slices,
    isSpinning,
    showPopup,
    winnerResult,
    defaultWinner,
    spin,
    startSpin,
    endSpin,
    closePopup,
  };
});

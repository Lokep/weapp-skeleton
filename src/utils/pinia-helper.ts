import { BaseObject } from "@/types/uni";
import { PiniaPluginContext } from "pinia";
import { unref } from "vue";

export const piniaMap: BaseObject<string> = {};

export const showPiniaState = () => {
  console.group("PINIA: ");
  console.table(piniaMap);
  console.groupEnd();
}

export default function myPiniaPlugin(context: PiniaPluginContext) {
  piniaMap[context.store.$id] = JSON.stringify(
    unref(context.options.state?.())
  );
}

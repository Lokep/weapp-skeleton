import { BaseObject } from "@/types/uni"
import { Ref, ref } from "vue"


export default function useLaunchOption (isImmediate?: boolean) {
  const launchOption: Ref<UniApp.GetLaunchOptionsSyncOptions | BaseObject<string>> = ref({})

  if (isImmediate) {
    getLaunchOption()
  }

  function getLaunchOption() {
    launchOption.value = uni.getLaunchOptionsSync()
  }


  return {
    launchOption,
    getLaunchOption
  }
}
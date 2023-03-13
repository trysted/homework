import { createEvent, restore } from "effector";

export const setPhone = createEvent<string>()
export const resetPhone = createEvent()

export const $phone = restore(setPhone, null)

$phone.reset(resetPhone)

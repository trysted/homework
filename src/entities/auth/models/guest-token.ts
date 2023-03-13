import { restore, createEvent } from "effector";

export const setGuestToken = createEvent<string>()
export const resetGuestToken = createEvent()

export const $guestToken = restore(setGuestToken, null)

$guestToken.reset(resetGuestToken)
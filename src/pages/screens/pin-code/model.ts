import { createStore, createEvent } from "effector";
import { AuthTokensData } from "@shared/types/types";

export const $authTokensData = createStore<AuthTokensData | null>(null)
export const $guestToken = createStore<string | null>(null)

export const initialAttemptsCount = 5

export const $attempts = createStore<number>(initialAttemptsCount)

export const updateAttempts = createEvent()
export const resetAttempts = createEvent()

$attempts.on(updateAttempts, (state) => state - 1)
$attempts.on(resetAttempts, () => initialAttemptsCount)

export const setGuestToken = createEvent<string>()

$guestToken.on(setGuestToken, (_, payload) => payload)

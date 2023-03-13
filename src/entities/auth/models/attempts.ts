import { createStore, createEvent } from "effector";

export const initialAttemptsCount = 5

export const $attempts = createStore<number>(initialAttemptsCount)

export const decrimentAttempts = createEvent()
export const resetAttempts = createEvent()

$attempts.on(decrimentAttempts, (state) => state - 1)
$attempts.on(resetAttempts, () => initialAttemptsCount)

$attempts.reset(resetAttempts)
import { createStore, createEvent } from "effector";

export const initialAttemptsCount = 5

export const $attempts = createStore<number>(initialAttemptsCount)

export const decrementAttempts = createEvent()
export const resetAttempts = createEvent()

$attempts.on(decrementAttempts, (state) => state - 1)
$attempts.on(resetAttempts, () => initialAttemptsCount)

$attempts.reset(resetAttempts)
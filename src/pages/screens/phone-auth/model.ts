import { createStore, createEvent } from "effector";
import { AuthData } from "@shared/types/types";

export const $phone = createStore<string | null>(null)
export const $authData = createStore<AuthData | null>(null)

export const setPhone = createEvent<string>()
export const setAuthData = createEvent<AuthData>()

$phone.on(setPhone, (_, payload) => payload)
$authData.on(setAuthData, (_, payload) => payload)
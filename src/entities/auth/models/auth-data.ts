import { createEvent, restore } from "effector";
import { AuthData } from "@entities/auth/models/types";

export const setAuthData = createEvent<AuthData>()
export const resetAuthData = createEvent()

export const $authData = restore(setAuthData, null)

$authData.reset(resetAuthData)
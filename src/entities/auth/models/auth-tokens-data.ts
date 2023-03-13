import { createEvent, restore } from "effector";
import { AuthTokensData } from "@entities/auth/models/types";

export const resetAuthTokensData = createEvent()
export const setAuthTokensData = createEvent<AuthTokensData>()

export const $authTokensData = restore(setAuthTokensData, null)

$authTokensData.reset(resetAuthTokensData)
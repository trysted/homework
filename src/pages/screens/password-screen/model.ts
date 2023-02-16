import { createStore, createEvent } from "effector";
import { AuthTokensData } from "@shared/types/types";

export const $authTokensData = createStore<AuthTokensData | null>(null)

export const setAuthTokens = createEvent<AuthTokensData>()

$authTokensData.on(setAuthTokens, (_, payload) => payload)
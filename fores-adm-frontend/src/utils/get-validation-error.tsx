import { TypeWithKey } from "../models/type-with-key"

export const getValidationError = (errorCode: string, msg: string | null) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: msg || "Error en la red",
    ERR_BAD_REQUEST: msg || "Error en la red",
  }

  return codeMatcher[errorCode]
}
import {
  Execution__Type,
  handleExecuteIntent,
} from "@/lib/fulfillment/execute";
import { handleQueryIntent } from "./query";
import { handleSync } from "./sync";

export enum Intent__Enum {
  Sync = "action.devices.SYNC",
  Query = "action.devices.QUERY",
  Execute = "action.devices.EXECUTE",
}

export type Intent__Type =
  | Sync_Intent__Type
  | Query_Intent__Type
  | Execute_Intent__Type;

type Intent_Request__Type = {
  requestId: string;
  inputs: Intent__Type[];
};

type Query_Intent_Payload__Type = {
  devices: { id: string }[];
};

type Query_Intent__Type = {
  intent: Intent__Enum.Query;
  payload: Query_Intent_Payload__Type;
};

type Sync_Intent__Type = {
  intent: Intent__Enum.Sync;
};

type Execute_Intent_Payload_Command__Type = {
  devices: { id: string }[];
  execution: Execution__Type[];
};

type Execute_Intent_Payload__Type = {
  commands: Execute_Intent_Payload_Command__Type[];
};

export type Execute_Intent__Type = {
  intent: Intent__Enum.Execute;
  payload: Execute_Intent_Payload__Type;
};

const handleInput = async (
  input: Sync_Intent__Type | Query_Intent__Type | Execute_Intent__Type,
  userId: string
) => {
  if (input.intent === Intent__Enum.Sync) return await handleSync(userId);

  if (input.intent === Intent__Enum.Query)
    return await handleQueryIntent(input, userId);

  if (input.intent === Intent__Enum.Execute) {
    return await handleExecuteIntent(input, userId);
  }
};

export const handleIntentRequest = async (
  intentRequest: Intent_Request__Type,
  userId: string
) => {
  const { requestId, inputs } = intentRequest;

  const payload = await handleInput(inputs[0], userId);

  console.log(payload)

  return Response.json({
    requestId,
    payload,
  });
};

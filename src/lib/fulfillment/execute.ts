import { Device } from "@/models/Device";
import { Execute_Intent__Type } from ".";

export enum Command__Enum {
  OnOff = "action.devices.commands.OnOff",
  BrightnessAbsolute = "action.devices.commands.BrightnessAbsolute",
}

export type Execution__Type =
  | BrightnessAbsolute_Execution__Type
  | OnOff_Execution__Type;

type BrightnessAbsolute_Execution__Type = {
  command: Command__Enum.BrightnessAbsolute;
  params: {
    brightness: number;
  };
};

type OnOff_Execution__Type = {
  command: Command__Enum.OnOff;
  params: {
    on: boolean;
  };
};

type Handle_Execute_Params__Type = {
  devices: { id: string }[];
  execution: Execution__Type[];
};

type Handle_Execution_Response__Type = {
  status: "SUCCESS" | "ERROR" | "OFFLINE";
  errorCode?: "deviceNotFound" | "deviceOffline" | "hardError";
  states?: {
    on: boolean;
    online: boolean;
  };
  id: string;
};

const handleExecution = async (
  id: string,
  execution: Execution__Type
): Promise<Handle_Execution_Response__Type> => {
  const { command, params } = execution;

  const device = await Device.findById(id);

  if (!device) return { status: "ERROR", errorCode: "deviceNotFound", id };

  if (command === Command__Enum.OnOff) {
    device.states = { ...device.states, on: params.on };
  }

  if (command === Command__Enum.BrightnessAbsolute) {
    device.states = { ...device.states, brightness: params.brightness };
  }

  try {
    await device.save();
  } catch (error) {
    console.log("save error: ", error);
    return { status: "ERROR", errorCode: "hardError", id };
  }

  return { status: "SUCCESS", states: device.states, id };
};

const handleExecute = async ({
  devices,
  execution,
}: Handle_Execute_Params__Type): Promise<Handle_Execution_Response__Type[]> => {
  return await Promise.all(
    devices.flatMap(({ id }) => {
      return execution.map((e) => handleExecution(id, e));
    })
  );
};

export const handleExecuteIntent = async (
  intent: Execute_Intent__Type,
  userId: string
) => {
  const {
    payload: { commands },
  } = intent;

  const report = await Promise.all(
    commands.map(async (command) => await handleExecute(command))
  );

  return {
    commands: report.flat().map((x) => {
      const { id, ...rest } = x;

      return {
        ids: [x.id],
        ...rest,
      };
    }),
  };
};

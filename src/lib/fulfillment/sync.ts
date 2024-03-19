import {
  Device,
  Device_Trait__Type,
  Device_Type__Type,
  Device__Type,
} from "@/models/Device";
import { Intent__Enum, Intent__Type } from "@/lib/fulfillment";

type Sync_Intent__Type = Intent__Type & {
  intent: Intent__Enum.Sync;
};

type Sync_Intent_Payload_Device__Type = {
  id: string;
  type: Device_Type__Type;
  traits: Device_Trait__Type[];
  name: { name: string };
  roomHint: string;
  willReportState: boolean;
};

const translateGoogleSync = (
  device: Device__Type
): Sync_Intent_Payload_Device__Type => {

  console.log(device.traits)

  return {
    id: device._id,
    name: {
      name: device.name,
    },
    roomHint: device.room,
    type: device.type,
    traits: device.traits,
    willReportState: false,
  };
};

type Sync_Intent_Result__Type = {
  agentUserId: string;
  devices: Sync_Intent_Payload_Device__Type[];
};

export const handleSync = async (
  userId: string
): Promise<Sync_Intent_Result__Type> => {
  const devices = await Device.find({ userId: userId });

  return {
    agentUserId: userId,
    devices: devices.map((device) => translateGoogleSync(device)),
  };
};

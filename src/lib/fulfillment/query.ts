import { Device, Device__Type } from "@/models/Device";
import { Intent__Enum, Intent__Type } from ".";

type Query_Intent_Payload__Type = {
  devices: { id: string }[];
};

type Query_Intent__Type = Intent__Type & {
  intent: Intent__Enum.Query;
  payload: Query_Intent_Payload__Type;
};

type Query_Response_Devices__Type = {
  [key: string]: {
    on: boolean;
    online: boolean;
    status: "SUCCESS";
  };
};

const translateGoogleQuery = (
  devices: Device__Type[]
): Query_Response_Devices__Type => {
  return devices.reduce(
    (m, v) => ({
      ...m,
      [v._id]: {
        // online: v.states.online,
        // on: v.states.on,
        ...v.states,
        status: "SUCCESS",
      },
    }),
    {}
  );
};

export const handleQueryIntent = async (
  intent: Query_Intent__Type,
  userId: string
) => {
  const { payload } = intent;

  const devices = await Device.find<Device__Type>({
    userId: userId,
    _id: payload.devices.map((x) => x.id),
  });

  return {
    agentUserId: userId,
    devices: translateGoogleQuery(devices),
  };
};
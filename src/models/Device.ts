import { Schema, model, models } from "mongoose";

const DEVICE_TYPE_LIGHT = "action.devices.types.LIGHT";

export enum Device_Type__Type {
  LIGHT = DEVICE_TYPE_LIGHT,
  SWITCH = "action.devices.types.SWITCH",
  OUTLET = "action.devices.types.OUTLET",
  AC_UNIT = "action.devices.types.AC_UNIT",
}

export const DEVICE_TRAIT_ON_OFF = "action.devices.traits.OnOff";

export enum Device_Trait__Type {
  OnOff = DEVICE_TRAIT_ON_OFF,
  Brightness = "action.devices.traits.Brightness",
  ColorSetting = "action.devices.traits.ColorSetting",
}

export type Device_Room__Type =
  | "Living Room"
  | "Bedroom"
  | "Kitchen"
  | "Backyard"
  | "Lung"
  | "Corridor";

export type Device__Type = {
  _id: string;
  userId: string;
  name: string;
  room: Device_Room__Type;
  identifier: string;
  // online: boolean;
  type: Device_Type__Type;
  traits: Device_Trait__Type[];
  attributes: {
    colorModel?: string;
    colorTemperatureRange?: {
      temperatureMinK: number;
      temperatureMaxK: number;
    };
  };
  states: {
    online?: boolean;
    on: boolean;
    brightness?: number;
    // ColorSetting
    color?: {
      temperatureK: number;
    };
  };
};

const schema = new Schema({
  identifier: { type: String, required: true },
  type: { type: String, required: true },
  traits: { type: [String], required: true },
  name: { type: String, required: true },
  room: { type: String, required: true },
  userId: { type: String, require: true },
  // Google Home
  attributes: { type: Schema.Types.Mixed },
  states: { type: Schema.Types.Mixed },
});

export const Device = models.Device || model("Device", schema);

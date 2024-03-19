export const enum Device_Trait__Type {
  OnOff = "action.devices.traits.OnOff",
  Brightness = "action.devices.traits.Brightness",
  ColorSetting = "action.devices.traits.ColorSetting",
}

export const enum Device_State__Type {
  on = "on",
  online = "online",
  brightness = "brightness",
}

export type Device_States__Type = {
  [Device_State__Type.on]?: boolean;
  [Device_State__Type.online]: boolean;
  [Device_State__Type.brightness]?: number;
};

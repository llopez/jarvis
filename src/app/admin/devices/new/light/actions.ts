"use server";

import { getSession } from "@/app/actions";
import { connect } from "@/lib/db";
import { Device, Device_Trait__Type, Device_Type__Type } from "@/models/Device";
import { Device_State__Type, Device_States__Type } from "@/types";
import { revalidatePath } from "next/cache";

type CreateErrorResponse = {
  error: string;
};

type CreateSuccessResponse = undefined;

export type CreateResponseType = CreateErrorResponse | CreateSuccessResponse;

const traitStates = (traits: Device_Trait__Type[]): Device_States__Type => {
  let data: Device_States__Type = { online: true };
  if (traits.includes(Device_Trait__Type.OnOff)) {
    data[Device_State__Type.on] = false;
  }
  if (traits.includes(Device_Trait__Type.Brightness)) {
    data[Device_State__Type.brightness] = 0;
  }
  return data;
};

export const create = async (
  prevState: any,
  data: FormData
): Promise<CreateResponseType> => {
  const name = data.get("name")?.toString();
  const identifier = data.get("id")?.toString();
  const room = data.get("room")?.toString();
  const traits = data
    .getAll("traits[]")
    .map((value) => value.toString()) as Device_Trait__Type[];

  const type = Device_Type__Type.LIGHT;

  const session = getSession();

  if (!name) {
    return { error: "name is blank" };
  }

  if (!identifier) {
    return { error: "identifier is blank" };
  }

  const states = traitStates(traits);

  await connect();

  try {
    await Device.create({
      name,
      identifier,
      type,
      room,
      traits,
      userId: session?.id,
      states,
    });
  } catch (err) {
    console.log(err);
    return { error: "database error" };
  }

  revalidatePath("/admin/devices/new/light");
};

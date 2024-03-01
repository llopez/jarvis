import { User } from "@/models/User";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  console.log("request body", data);

  const requestId = data.requestId;
  const accessToken = req.headers.get("authorization")?.split(" ")[1];

  console.log("RequestId: ", requestId);
  console.log("AccessToken: ", accessToken);

  const user = await User.findOne({ accessToken });

  return Response.json({
    requestId: requestId,
    payload: {
      agentUserId: user._id,
      devices: [
        {
          id: "456",
          type: "action.devices.types.LIGHT",
          traits: [
            "action.devices.traits.OnOff",
            "action.devices.traits.Brightness",
            "action.devices.traits.ColorSetting",
          ],
          name: {
            defaultNames: ["lights out inc. bulb A19 color hyperglow"],
            name: "lamp1",
            nicknames: ["reading lamp"],
          },
          willReportState: false,
          roomHint: "office",
          attributes: {
            colorModel: "rgb",
            colorTemperatureRange: {
              temperatureMinK: 2000,
              temperatureMaxK: 9000,
            },
            commandOnlyColorSetting: false,
          },
          deviceInfo: {
            manufacturer: "lights out inc.",
            model: "hg11",
            hwVersion: "1.2",
            swVersion: "5.4",
          },
          customData: {
            fooValue: 12,
            barValue: false,
            bazValue: "bar",
          },
        },
      ],
    },
  });
};

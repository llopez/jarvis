import mqtt, { MqttClient } from "mqtt";

const MQTT_BROKER = process.env.MQTT_BROKER!;

export let client: MqttClient;

export const connect = async (): Promise<MqttClient> => {
  client = await mqtt.connectAsync(MQTT_BROKER);
  console.log("mqtt: connected");

  await client.subscribeAsync("stat/#");
  await client.subscribeAsync("tele/#");

  client.on("message", (t, payload) => {
    console.log("mqtt topic/payload", t, payload.toString());
  });

  return client;
};

export const getClient = async (): Promise<MqttClient> => {
  if (client) return client;

  return await connect();
};

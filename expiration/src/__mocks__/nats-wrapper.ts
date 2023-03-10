export const natsWrapper = {
  client: {
    publish(subject: string, data: string, callBack: () => void) {
      callBack();
    },
  },
};

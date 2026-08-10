import { commands } from "@revenge-mod/plugins";

let unregister: (() => void) | undefined;

export default {
  onLoad: () => {
    try {
      unregister = commands.registerCommand({
        name: "t",
        displayName: "t",
        description: "Generates a dynamic Discord timestamp tag",
        displayDescription: "Generates a dynamic Discord timestamp tag",
        options: [
          {
            name: "hour",
            displayName: "hour",
            description: "Hour (0-23)",
            displayDescription: "Hour (0-23)",
            type: 4, // 
            required: true
          },
          {
            name: "day",
            displayName: "day",
            description: "Day of month (1-31)",
            displayDescription: "Day of month (1-31)",
            type: 4,
            required: true
          },
          {
            name: "month",
            displayName: "month",
            description: "Month (1-12)",
            displayDescription: "Month (1-12)",
            type: 4,
            required: true
          },
          {
            name: "year",
            displayName: "year",
            description: "Year (e.g. 2026)",
            displayDescription: "Year (e.g. 2026)",
            type: 4,
            required: true
          },
          {
            name: "minute",
            displayName: "minute",
            description: "Minute (0-59)",
            displayDescription: "Minute (0-59)",
            type: 4,
            required: false
          }
        ],
        type: 1, 
        execute: (args) => {
          try {
            const getOpt = (n: string) => args.find((o: any) => o.name === n)?.value;
            
            const hour = Number(getOpt("hour"));
            const day = Number(getOpt("day"));
            const month = Number(getOpt("month")) - 1; 
            const year = Number(getOpt("year"));
            const minute = Number(getOpt("minute")) || 0;

            const date = new Date(Date.UTC(year, month, day, hour, minute));
            const unix = Math.floor(date.getTime() / 1000);

            if (isNaN(unix)) {
              return { content: "Invalid date provided!" };
            }

            return { content: `<t:${unix}:F>` };
          } catch (err) {
            return { content: "Error generating timestamp." };
          }
        }
      });
    } catch (e) {
      console.error("[TimestampCommand Error]", e);
    }
  },

  onUnload: () => {
    if (typeof unregister === "function") {
      unregister();
    }
  }
};

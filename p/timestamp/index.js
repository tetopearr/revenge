(() => {
  const g = typeof globalThis !== "undefined" ? globalThis : window;
  const revenge = g.revenge || g.vendetta;

  let unregister;

  return {
    onLoad: () => {
      try {
        if (!revenge?.commands) return;

        unregister = revenge.commands.registerCommand({
          name: "t",
          displayName: "t",
          description: "Generates a dynamic Discord timestamp tag",
          displayDescription: "Generates a dynamic Discord timestamp tag",
          options: [
            { name: "hour", displayName: "hour", description: "Hour (0-23)", displayDescription: "Hour (0-23)", type: 4, required: true },
            { name: "day", displayName: "day", description: "Day (1-31)", displayDescription: "Day (1-31)", type: 4, required: true },
            { name: "month", displayName: "month", description: "Month (1-12)", displayDescription: "Month (1-12)", type: 4, required: true },
            { name: "year", displayName: "year", description: "Year (2026)", displayDescription: "Year (2026)", type: 4, required: true },
            { name: "minute", displayName: "minute", description: "Minute (0-59)", displayDescription: "Minute (0-59)", type: 4, required: false }
          ],
          type: 1,
          execute: (args) => {
            try {
              const getOpt = (n) => args.find((o) => o.name === n)?.value;
              const hour = Number(getOpt("hour"));
              const day = Number(getOpt("day"));
              const month = Number(getOpt("month")) - 1;
              const year = Number(getOpt("year"));
              const minute = Number(getOpt("minute")) || 0;

              const date = new Date(Date.UTC(year, month, day, hour, minute));
              const unix = Math.floor(date.getTime() / 1000);

              if (isNaN(unix)) return { content: "Invalid date!" };
              return { content: `<t:${unix}:F>` };
            } catch (err) {
              return { content: "Error generating timestamp." };
            }
          }
        });
      } catch (e) {
        console.error("[Timestamp Error]", e);
      }
    },
    onUnload: () => {
      if (typeof unregister === "function") unregister();
    }
  };
})();

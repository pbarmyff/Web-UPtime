export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
      const { runChecks } = await import("./lib/monitoring");
      if (!global.monitoringInterval) {
         console.log("Starting monitoring interval...");
         global.monitoringInterval = setInterval(() => {
             runChecks();
         }, 10000);
      }
  }
}

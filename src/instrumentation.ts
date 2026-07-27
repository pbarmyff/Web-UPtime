export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
      const { runChecks } = await import("./lib/monitoring");
      if (!global.monitoringInterval) {
         global.monitoringInterval = setInterval(() => {
             runChecks();
         }, 10000);
      }
  }
}

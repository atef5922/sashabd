/** Vercel hosts staging for this repository; public production is exported to LiteSpeed. */
export function isVercelStagingBuild(): boolean {
  return process.env.VERCEL === "1";
}

export function getIndexableRobots() {
  const allowIndexing = !isVercelStagingBuild();
  return { index: allowIndexing, follow: allowIndexing };
}

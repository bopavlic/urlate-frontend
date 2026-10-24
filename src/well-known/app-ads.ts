// app-ads.txt: AdMob only serves ads for apps whose developer website (urlate.app, as listed
// in the stores) names the AdMob publisher account. f08c47fec0942fa0 is Google's own id.

export function appAdsTxt(publisherId: string | undefined): string | null {
  const id = publisherId?.trim().replace(/^ca-app-/, "");
  if (!id || !/^pub-\d{16}$/.test(id)) return null;
  return `google.com, ${id}, DIRECT, f08c47fec0942fa0\n`;
}

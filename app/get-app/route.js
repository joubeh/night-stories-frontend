import { NextResponse } from "next/server";
import { createReadStream, statSync } from "node:fs";
import { join } from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";

export async function GET() {
  const filePath = join(process.cwd(), "public", "downloads", "qeseyeshab.apk");

  const stat = statSync(filePath);
  const stream = Readable.toWeb(createReadStream(filePath));

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": 'attachment; filename="qeseyeshab.apk"',
      "Content-Length": String(stat.size),
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}

// Optional: respond to HEAD with headers only (helps some clients)
export async function HEAD() {
  const filePath = join(process.cwd(), "public", "downloads", "qeseyeshab.apk");
  const stat = statSync(filePath);
  return new NextResponse(null, {
    headers: {
      "Content-Type": "application/vnd.android.package-archive",
      "Content-Disposition": 'attachment; filename="qeseyeshab.apk"',
      "Content-Length": String(stat.size),
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}

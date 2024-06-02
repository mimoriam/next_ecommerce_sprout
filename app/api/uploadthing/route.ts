import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingSecret: process.env.NEXT_PUBLIC_UPLOADTHING_SECRET!,
    uploadthingId: process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID!,
  },
});

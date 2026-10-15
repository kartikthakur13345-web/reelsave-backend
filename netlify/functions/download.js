
export default async (request) => {
  if (request.method !== "GET") {
    return new Response("Method not allowed", {
      status: 405
    });
  }

  const url = new URL(request.url);
  const video = url.searchParams.get("url");

  if (!video) {
    return Response.json(
      { error: "Video URL is required" },
      { status: 400 }
    );
  }

  let target;

  try {
    target = new URL(video);
  } catch {
    return Response.json(
      { error: "Invalid URL" },
      { status: 400 }
    );
  }

  if (
    !["http:", "https:"].includes(target.protocol) ||
    !/\.(mp4|webm|ogg|mov|m4v)$/i.test(target.pathname)
  ) {
    return Response.json(
      { error: "A direct video file URL is required" },
      { status: 400 }
    );
  }

  return Response.json({
    message: "URL validated",
    videoUrl: target.href
  });
};

import { cookies } from "next/headers";

export default async function CommentButton() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("token")?.value;
  if (!accessToken) return null;
  return (
    <button className="sendBtn sm-w-100 relative fw-700 p-tb-05-lr-1 radius-10-custom border-custom c-hover-white z-1">
      Comment
    </button>
  );
}

import { useRouter } from "next/router";
import New from "../new";

export default function EditPage({ params }) {
  const router = useRouter();
  const { postId } = router.query;
  return <New postId={postId} />;
}

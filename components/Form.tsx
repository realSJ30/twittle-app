import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePost from "@/hooks/usePost";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineFaceSmile, HiOutlinePhoto } from "react-icons/hi2";
import Avatar from "./Avatar";
import Button from "./Button";
import Logo from "./Logo";

interface IForm {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const MAX_LENGTH = 280;

const Form: React.FC<IForm> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const remaining = useMemo(() => MAX_LENGTH - body.length, [body]);
  const tooLong = remaining < 0;

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";
      await axios.post(url, { body });
      toast.success(isComment ? "Reply sent" : "Post published");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, isComment, postId, mutatePosts, mutatePost]);

  if (!currentUser) {
    return (
      <div className="border-b border-line px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <Logo size={44} />
          <h2 className="mt-4 font-display text-2xl font-bold text-ink">
            Join the conversation
          </h2>
          <p className="mt-1 text-[15px] text-ink-muted">
            Share a thought, reply to a friend, or just lurk. Twittle is a
            lighter, calmer take on the social feed.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              label="Log in"
              onClick={() => loginModal.onOpen()}
              large
            />
            <Button
              label="Create account"
              onClick={() => registerModal.onOpen()}
              large
              outline
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-line px-4 py-4 sm:px-6">
      <div className="flex gap-3">
        <div className="pt-1">
          <Avatar userId={currentUser?.id} />
        </div>
        <div className="flex-1">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            rows={isComment ? 2 : 3}
            className="
              peer w-full resize-none bg-transparent
              text-[17px] leading-snug text-ink placeholder-ink-faint
              outline-none disabled:opacity-70
            "
            placeholder={placeholder}
          />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1 text-ink-soft">
              <button
                type="button"
                className="rounded-full p-2 transition hover:bg-brand-soft hover:text-brand-700 dark:hover:text-brand-500"
                aria-label="Attach image"
              >
                <HiOutlinePhoto size={18} />
              </button>
              <button
                type="button"
                className="rounded-full p-2 transition hover:bg-brand-soft hover:text-brand-700 dark:hover:text-brand-500"
                aria-label="Add emoji"
              >
                <HiOutlineFaceSmile size={18} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-xs tabular-nums ${
                  tooLong
                    ? "text-accent-rose font-semibold"
                    : remaining < 40
                    ? "text-accent-amber"
                    : "text-ink-faint"
                }`}
              >
                {remaining}
              </span>
              <Button
                label={isComment ? "Reply" : "Post"}
                onClick={onSubmit}
                disabled={isLoading || !body || tooLong}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

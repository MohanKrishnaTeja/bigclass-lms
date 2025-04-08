import { useState } from "react";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Comments({ courseId, videoId }) {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "krishna",
      avatar:
        "https://www.shadcn-vue.com/avatars/02.png",
      text: "This explanation was so clear. Thanks a lot!",
      time: "2 hours ago",
      likes: 2,
      dislikes: 0,
      replies: [],
      showReplyInput: false,
      showReplies: false,
      replyText: "",
    },
    {
      id: 2,
      name: "teja",
      avatar:
        "https://www.shadcn-vue.com/avatars/02.png",
      text: "Can someone explain the async part again?",
      time: "1 hour ago",
      likes: 1,
      dislikes: 1,
      replies: [],
      showReplyInput: false,
      showReplies: false,
      replyText: "",
    },
  ]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      name: "You",
      avatar:
        "https://www.shadcn-vue.com/avatars/01.png",
      text: commentText,
      time: "Just now",
      likes: 0,
      dislikes: 0,
      replies: [],
      showReplyInput: false,
      showReplies: false,
      replyText: "",
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const toggleReplyInput = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, showReplyInput: !c.showReplyInput } : c
      )
    );
  };

  const handleReplySubmit = (commentId, replyText) => {
    if (!replyText.trim()) return;

    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              name: "You",
              text: replyText,
              time: "Just now",
              avatar:
                "https://www.shadcn-vue.com/avatars/02.png",
            },
          ],
          showReplyInput: false,
          replyText: "",
        };
      }
      return comment;
    });

    setComments(updatedComments);
  };

  const toggleRepliesVisibility = (commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, showReplies: !c.showReplies } : c
      )
    );
  };

  const handleLikeDislike = (commentId, type) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? {
              ...c,
              likes: type === "like" ? c.likes + 1 : c.likes,
              dislikes: type === "dislike" ? c.dislikes + 1 : c.dislikes,
            }
          : c
      )
    );
  };

  const handleReplyChange = (commentId, text) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, replyText: text } : c
      )
    );
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {comments.length} Comments
      </h3>

      {/* Add Comment */}
      <div className="flex space-x-3 mb-6">
        <Avatar>
          <img
            className="rounded-full"
            src="https://www.shadcn-vue.com/avatars/02.png"
            alt="You"
          />
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button variant="outline" className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleAddComment}>Comment</Button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar>
              <img
                className="rounded-full"
                src={comment.avatar}
                alt={comment.name}
              />
            </Avatar>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {comment.name}{" "}
                <span className="text-xs text-gray-500 ml-2">{comment.time}</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-300">
                {comment.text}
              </p>

              <div className="flex flex-wrap gap-2 text-sm mt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleLikeDislike(comment.id, "like")}
                >
                  <ArrowUp className="w-4 h-4" />
                  {comment.likes}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => handleLikeDislike(comment.id, "dislike")}
                >
                  <ArrowDown className="w-4 h-4" />
                  {comment.dislikes}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-600"
                  onClick={() => toggleReplyInput(comment.id)}
                >
                  Reply
                </Button>

                {comment.replies.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-blue-600"
                    onClick={() => toggleRepliesVisibility(comment.id)}
                  >
                    {comment.showReplies
                      ? "Hide Replies"
                      : `View Replies (${comment.replies.length})`}
                  </Button>
                )}
              </div>

              {/* Reply Input */}
              {comment.showReplyInput && (
                <div className="mt-3">
                  <Textarea
                    placeholder="Write a reply..."
                    className="mb-2"
                    value={comment.replyText}
                    onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleReplyInput(comment.id)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() =>
                        handleReplySubmit(comment.id, comment.replyText)
                      }
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}

              {/* Replies */}
              {comment.showReplies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-3">
                      <Avatar>
                        <img
                          className="rounded-full"
                          src={reply.avatar}
                          alt={reply.name}
                        />
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {reply.name}{" "}
                          <span className="text-xs text-gray-500 ml-2">
                            {reply.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-300">
                          {reply.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

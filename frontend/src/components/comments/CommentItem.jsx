import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust path
import { Button } from "@/components/ui/button"; // Adjust path
import { ThumbsUp, ThumbsDown, MessageSquareReply, ChevronDown, ChevronUp } from "lucide-react";
import CommentInput from "./CommentInput"; // Import the new input component

export default function CommentItem({
  comment,
  onLikeDislike,
  onToggleReplyInput,
  onReplySubmit,
  onReplyChange,
  onToggleRepliesVisibility,
  isReply = false, // Flag to indicate if this item is a reply
}) {
  // Function to format time (replace with a proper date-fns or similar library)
  const formatTimeAgo = (timeString) => {
    // Basic placeholder - replace with actual time formatting logic
    return timeString;
  };

  const handleInternalReplySubmit = (replyText) => {
    onReplySubmit(comment.id, replyText);
  };

  return (
    <div className={`flex w-full items-start space-x-3 ${isReply ? "ml-8 sm:ml-12" : ""}`}>
       {/* Avatar (smaller for replies) */}
       <Avatar className={`flex-shrink-0 ${isReply ? 'h-8 w-8' : 'h-10 w-10'}`}>
        <AvatarImage src={comment.avatar} alt={`${comment.name}'s Avatar`} />
        <AvatarFallback>
           {comment.name?.substring(0, 2).toUpperCase() || '??'}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        {/* Comment Header */}
        <div className="mb-1 flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">
            {comment.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(comment.time)}
          </span>
        </div>

        {/* Comment Text */}
        <p className="text-sm text-foreground/90 mb-2 whitespace-pre-wrap break-words">
          {comment.text}
        </p>

        {/* Comment Actions */}
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1.5 hover:bg-accent/50"
            aria-label="Like comment"
            onClick={() => onLikeDislike(comment.id, "like")}
          >
            <ThumbsUp className="mr-1 h-4 w-4" />
            {comment.likes > 0 && <span>{comment.likes}</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1.5 hover:bg-accent/50"
            aria-label="Dislike comment"
            onClick={() => onLikeDislike(comment.id, "dislike")}
          >
            <ThumbsDown className="h-4 w-4" />
            {/* Optionally show dislikes: {comment.dislikes > 0 && <span>{comment.dislikes}</span>} */}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-1.5 font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground"
            onClick={() => onToggleReplyInput(comment.id)}
          >
             {/* Using an icon might be cleaner for replies if space is tight */}
            {/* <MessageSquareReply className="h-4 w-4 mr-1" /> */}
            Reply
          </Button>
        </div>

        {/* Reply Input Area (conditionally shown) */}
        {comment.showReplyInput && (
          <div className="mt-3">
            <CommentInput
              onSubmit={handleInternalReplySubmit}
              placeholder={`Replying to ${comment.name}...`}
              submitLabel="Reply"
              initialValue={comment.replyText} // Use replyText if needed, or keep empty
              onCancel={() => onToggleReplyInput(comment.id)} // Allow canceling the reply input
              showAvatar={false} // Don't show avatar for inline reply input
              autoFocus={true} // Focus when reply input appears
            />
             {/* Optional: If you want to track reply text separately per comment */}
             {/* <Textarea value={comment.replyText} onChange={(e) => onReplyChange(comment.id, e.target.value)} /> */}
          </div>
        )}

        {/* Replies Section Toggle & List */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1.5 font-medium text-blue-600 hover:bg-blue-100/50 dark:text-blue-400 dark:hover:bg-blue-900/30"
              onClick={() => onToggleRepliesVisibility(comment.id)}
            >
              {comment.showReplies ? (
                <ChevronUp className="mr-1 h-4 w-4" />
              ) : (
                <ChevronDown className="mr-1 h-4 w-4" />
              )}
              {comment.showReplies
                ? "Hide Replies"
                : `${comment.replies.length} ${
                    comment.replies.length === 1 ? "Reply" : "Replies"
                  }`}
            </Button>

            {/* Render Replies (Recursively or just one level) */}
            {comment.showReplies && (
              <div className="mt-3 space-y-4 border-l-2 border-muted pl-4">
                 {comment.replies.map((reply) => (
                  // You might need a different component or prop for nested reply actions
                  // if they differ significantly (e.g., no further replies allowed)
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onLikeDislike={() => {}} // Decide if replies are likable
                    onToggleReplyInput={() => {}} // Decide if nested replies are allowed
                    onReplySubmit={() => {}}
                    onReplyChange={() => {}}
                    onToggleRepliesVisibility={() => {}} // Replies usually don't have sub-replies shown this way
                    isReply={true} // Indicate this is a reply for styling
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
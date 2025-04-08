import React, { useState, useCallback } from "react";
import CommentInput from "./CommentInput"; // Adjust path
import CommentItem from "./CommentItem"; // Adjust path

// Helper to generate unique IDs (replace with actual backend IDs)
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

// --- Mock Data (Keep or replace with actual data fetching) ---
const initialCommentsData = [
   {
     id: "c1",
     name: "Alice Wonderland",
     avatar: "https://i.pravatar.cc/150?img=1",
     text: "This explanation was so clear. Thanks a lot! Really helped me understand the core concepts.",
     time: "2 hours ago",
     likes: 15,
     dislikes: 0,
     replies: [
       {
         id: "r1-1",
         name: "Bob The Builder",
         avatar: "https://i.pravatar.cc/150?img=3",
         text: "Totally agree! The examples were spot on.",
         time: "1 hour ago",
         likes: 3,
         dislikes: 0,
         replies: [],
         showReplyInput: false,
         showReplies: false,
         replyText: "",
       },
     ],
     showReplyInput: false,
     showReplies: false,
     replyText: "",
   },
   {
     id: "c2",
     name: "Charlie Chaplin",
     avatar: "https://i.pravatar.cc/150?img=5",
     text: "Can someone explain the async part around 5:30 again? I'm a bit lost there.",
     time: "1 hour ago",
     likes: 5,
     dislikes: 1,
     replies: [],
     showReplyInput: false,
     showReplies: false,
     replyText: "",
   },
 ];
// --- End Mock Data ---


export default function CommentsSection({ courseId, videoId }) {
  const [comments, setComments] = useState(initialCommentsData);

  // --- Handlers (Keep unchanged from previous version) ---
  const handleAddComment = useCallback((commentText) => {
    if (!commentText.trim()) return;
    const newComment = {
      id: generateId(), name: "You", avatar: "https://github.com/shadcn.png",
      text: commentText, time: "Just now", likes: 0, dislikes: 0, replies: [],
      showReplyInput: false, showReplies: false, replyText: "",
    };
    setComments((prevComments) => [newComment, ...prevComments]);
    // TODO: API call
  }, []);

  const handleToggleReplyInput = useCallback((commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, showReplyInput: !c.showReplyInput } : c
      )
    );
  }, []);

  const handleReplySubmit = useCallback((commentId, replyText) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: generateId(), name: "You", avatar: "https://github.com/shadcn.png",
      text: replyText, time: "Just now", likes: 0, dislikes: 0, replies: [],
      showReplyInput: false, showReplies: false, replyText: "",
    };
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment, replies: [...comment.replies, newReply],
            showReplyInput: false, replyText: "", showReplies: true,
          };
        }
        return comment;
      })
    );
     // TODO: API call
  }, []);

  const handleReplyChange = useCallback((commentId, text) => {
      setComments((prev) =>
          prev.map((c) =>
              c.id === commentId ? { ...c, replyText: text } : c
          )
      );
  }, []);

  const handleToggleRepliesVisibility = useCallback((commentId) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, showReplies: !c.showReplies } : c
      )
    );
  }, []);

  const handleLikeDislike = useCallback((commentId, type) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          return { ...c, likes: type === "like" ? c.likes + 1 : c.likes, dislikes: type === "dislike" ? c.dislikes + 1 : c.dislikes, };
        }
        if (c.replies?.length > 0) {
             return { ...c, replies: c.replies.map(reply => {
                     if (reply.id === commentId) { return { ...reply, likes: type === "like" ? reply.likes + 1 : reply.likes, dislikes: type === "dislike" ? reply.dislikes + 1 : reply.dislikes, }; }
                     return reply;
                })
             }
        }
        return c;
      })
    );
    // TODO: API call
  }, []);
  // --- End Handlers ---


  const totalCommentsCount = comments.reduce((count, comment) => count + 1 + (comment.replies?.length || 0), 0);

  return (
    // REMOVED horizontal padding (px-...) from this container
    // It's still centered on large screens due to max-w-3xl and mx-auto
    <div className="mt-6 w-full max-w-3xl mx-auto">
      {/* Header - Add padding here if needed so text isn't at the very edge */}
      <div className="mb-6 flex items-center justify-between px-1 sm:px-0"> {/* Added minimal padding for header */}
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">
             {comments.length} Comments
          </h3>
          {/* Sorting Dropdown could go here */}
      </div>

      {/* Add New Comment Input - Add padding here if needed */}
      <div className="mb-8 px-1 sm:px-0"> {/* Added minimal padding for input area */}
          <CommentInput onSubmit={handleAddComment} />
      </div>

      {/* Comment List */}
      {/* This container itself doesn't need padding now */}
      <div className="space-y-6">
        {comments.map((comment) => (
           // The padding 'p-4' INSIDE this wrapper controls spacing around the CommentItem
           // This div will now extend closer to the edges of the max-w-3xl container
           <div key={comment.id} className="p-4 rounded-lg bg-gray-100 dark:bg-gray-950 shadow-sm">
             <CommentItem
                comment={comment}
                onLikeDislike={handleLikeDislike}
                onToggleReplyInput={handleToggleReplyInput}
                onReplySubmit={handleReplySubmit}
                onReplyChange={handleReplyChange} // Pass handler if needed by CommentItem/Input
                onToggleRepliesVisibility={handleToggleRepliesVisibility}
             />
           </div>
        ))}
      </div>
    </div>
  );
}
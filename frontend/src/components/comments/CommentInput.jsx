import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Adjust path if needed
import { Button } from "@/components/ui/button"; // Adjust path if needed
import { Textarea } from "@/components/ui/textarea"; // Adjust path if needed

// A generic user avatar URL for the current user (replace with actual logic)
const currentUserAvatar =
  "https://github.com/shadcn.png"; // Example placeholder

export default function CommentInput({
  onSubmit,
  placeholder = "Add a comment...",
  submitLabel = "Comment",
  initialValue = "",
  onCancel, // Optional: Add cancel functionality
  showAvatar = true, // Control if avatar is shown (useful for replies)
  autoFocus = false, // Control autofocus
}) {
  const [text, setText] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission if wrapped in form
    if (!text.trim()) return;
    onSubmit(text);
    setText(""); // Clear input after submission
    setIsFocused(false); // Lose focus/hide buttons after submit
  };

  const handleCancel = () => {
    setText("");
    setIsFocused(false);
    if (onCancel) {
      onCancel(); // Call parent cancel handler if provided
    }
  };

  const showButtons = isFocused || text.length > 0;

  return (
    <div className="flex w-full items-start space-x-3">
      {showAvatar && (
        <Avatar className="h-10 w-10 flex-shrink-0">
          {/* Replace with actual user avatar logic */}
          <AvatarImage src={currentUserAvatar} alt="Your Avatar" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1">
        <Textarea
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          // onBlur={() => !text && setIsFocused(false)} // Optional: hide buttons if text is empty on blur
          className="mb-2 min-h-[40px] resize-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          autoFocus={autoFocus}
        />
        {showButtons && (
          <div className="flex justify-end space-x-2">
            {/* Conditionally show Cancel button only if needed */}
            {onCancel || text.length > 0 ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={!text.trim()} // Disable if text is empty or only whitespace
            >
              {submitLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
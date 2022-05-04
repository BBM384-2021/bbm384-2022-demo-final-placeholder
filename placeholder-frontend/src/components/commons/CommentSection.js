import React, { useEffect, useState } from "react"
import CommentBar from "./CommentBar";
import Comment from "./Comment";
import { createComment } from "../../services/CommentService";

export default function CommentSection ( {comments, user_id, post_id, interactionContent, setInteractionContent} ) {
    const currTime = new Date();
    const [waitResponse, setWaitResponse] = useState(false);

    const handleCreateComment = (commentBody) => {
        return () => {
            const setWaitNInteraction = () => {
                setWaitResponse(false);
                setInteractionContent({...interactionContent, "commentCount" : interactionContent.commentCount + 1})
            }

            setWaitResponse(true);
            createComment(
                user_id,
                post_id,
                commentBody,
                setWaitNInteraction,
            );
        };
    }

    const compareComments = (comment1, comment2) => {
        // sort from latest to oldest
        const date1 = new Date(comment1.comment.share_date);
        const date2 = new Date(comment2.comment.share_date);
        if (date1 < date2) {
            return 1;
        } else if (date1 > date2) {
            return -1;
        } else {
            return 0;
        }
    }

    return (
        <div>
            <CommentBar onClick={handleCreateComment} waitResponse={waitResponse}/>
            <div>
                {comments.length > 0 &&
                    comments.sort(compareComments).map((comment) => {
                        const commentTime = new Date(comment.comment.share_date)
                        const diffTimeMS = (currTime - commentTime);
                        return (
                            <Comment
                                comment={comment}
                                key={comment.comment.post_id + "-" + comment.comment.id}
                                timeDiffMS={diffTimeMS}
                                enableCommentOptions={user_id === comment.user.id}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
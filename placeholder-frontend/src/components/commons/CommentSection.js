import React, { useState } from "react"
import CommentBar from "./CommentBar";
import Comment from "./Comment";
import { createComment } from "../../services/CommentService";

export default function CommentSection ( {comments, user_id, post_id} ) {
    const currTime = new Date();
    const [waitResponse, setWaitResponse] = useState(false);

    const handleCreateComment = (commentBody) => {
        return () => {
            setWaitResponse(true);
            createComment(
                user_id,
                post_id,
                commentBody,
                setWaitResponse
            );
        };
    }

    return (
        <div>
            <CommentBar onClick={handleCreateComment} waitResponse={waitResponse}/>
            <div>
                {comments.length > 0 &&
                    comments.map((comment) => {
                        const commentTime = new Date(comment.comment.share_date)
                        const diffTimeMS = (currTime - commentTime);
                        return (
                            <Comment
                                comment={comment}
                                key={comment.comment.post_id + "-" + comment.comment.id}
                                timeDiffMS={diffTimeMS}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
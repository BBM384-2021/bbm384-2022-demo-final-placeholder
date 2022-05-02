import React from "react"
import CommentBar from "./CommentBar";
import Comment from "./Comment";

export default function CommentSection ( {comments} ) {
    const currTime = new Date();

    return (
        <div>
            <CommentBar />
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
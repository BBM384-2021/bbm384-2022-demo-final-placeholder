import React from "react"
import CommentBar from "./CommentBar";
import Comment from "./Comment";

export default function CommentSection ( {comments} ) {
    return (
        <div>
            <CommentBar />
            <div>
                {comments.length > 0 &&
                    comments.map((comment) => {
                        return (
                            <Comment
                                comment={comment}
                                key={comment.comment.post_id + "-" + comment.comment.id}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};
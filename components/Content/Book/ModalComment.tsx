import React from "react";
import style from "@/style/Auth/FormModal.module.css";
import { ArticleResponse } from "@/utils/testing/types";

interface CommentModalProps {
  articles: ArticleResponse | undefined;
}
const ModalComment = ({ articles }: CommentModalProps) => {
  return (
    <>
      <form className={style.messageForm}>
        <h2 className={style.title}>Comments</h2>
        <div className={style.wrapp}>
          <textarea
            id="commentBook"
            name="commentBook"
            placeholder={`Comment E-Book ${articles?.title}...`}
            required
            className={style.input}
            rows={5}
          />
        </div>
        <div className={style.Send}>
          <button type="submit" className={style.sendBtn}>
            Send Comment
          </button>
        </div>
      </form>
      <div>Comment User</div>
    </>
  );
};
export default ModalComment;

// 콘솔 주석 완료
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deleteComment, __insertComment } from "../../redux/modules/contentsSlice"


import styled from "styled-components";

const Comment = ({ reply }) => {

    const contentId = useParams()
    const dispatch = useDispatch("");
    const [comment, setComment] = useState({
        comment: "",
    });

    const onChangeInputHandler = (event) => {
        const { name, value } = event.target;
        setComment({
            ...comment,
            [name]: value,
        });
    };


    // 댓글 작성
    const onAddCommentButtonHandler = (event) => {
        event.preventDefault();
        const obj = {
            id: contentId.id,
            comment,
        }
        if (comment.comment.trim() === "") {
            return alert("모든 항목을 입력해주세요.");
        }
        dispatch(__insertComment(obj));
        setComment({
            comment: "",
        });
        // window.location.replace(`/detail/${Id}`)
    };


    // 댓글 삭제 버튼
    const onDeleteButton = (id) => {
        dispatch(__deleteComment(id))
        // alert("삭제하시겠습니까?")
        // window.location.replace(`/detail/${Id}`)
    };

    //디스패치-명령 // 리스트로 
    // useEffect(() => {
    //     dispatch(__getContent(newid));
    // }, [dispatch]);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>댓글 남기기</h1>
            <StCommentBox >
                <StcommentInput
                    placeholder="(100자 이내로 입력해주세요)"
                    value={comment.comment}
                    name="comment"
                    type="text"
                    onChange={onChangeInputHandler}
                    maxLength={100}
                />
                <Button style={{ height: "47px" }} onClick={onAddCommentButtonHandler}>
                    추가하기
                </Button>
            </StCommentBox>

            <StCommentListBox>
                {
                    reply !== undefined &&
                    reply.map((item) => {

                        return (
                            <StCommentList key={item.commentId}>
                                <div style={{ color: "green", width: "90px" }}>({item.createdAt})</div>
                                <StStrong>{item.accountName} :</StStrong>
                                <StSpan>{item.comment}</StSpan>
                                <Button2 onClick={() => onDeleteButton(item.commentId)}>삭제하기</Button2>
                            </StCommentList>

                        )
                    }
                    )
                }
            </StCommentListBox>
        </>
    )
}

export default Comment;

const StCommentBox = styled.div`
  display: flex;
  width: 600px;
  height: 250px;
  margin: 0 auto;
  margin-top:15px;
`;

const StcommentInput = styled.input`
  width: 360px;
  height:40px;
  margin-left:10px;
  text-indent:15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width:120px;
  margin-left:10px;
  font-weight:600;
  color:#fff;
  background-color:#22B14C;
  border-radius: 10px;
  
`

const StCommentListBox = styled.div`
  width: 600px;
  margin: 0 auto;
`

const StCommentList = styled.div`
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  display:flex;
  padding:20px 0;
`;

const StStrong = styled.strong`
  width:100px;
  padding:8px;
  color:black;
  display:block;
`;

const StSpan = styled.span`
  width:360px;
  height: 50px;
  padding:8px;
  display:block;
`;
const Button2 = styled.button`
  border:none;
  cursor:pointer;
  width:120px;
  height:40px;
  margin-left:10px;
  font-weight:600;
  color:#fff;
  background-color:#e50913;
  border-radius: 10px;
`
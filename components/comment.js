import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import {Reply, ReplyForm} from './reply'

const Pagination = ({comment, onLoadReplies}) => {
  const showPrev = (comment.page > 1) &&
    (comment.totalReplies > comment.perPage)
  const showNext = (comment.page < comment.lastPage)
  return (
    <span className='comment-pagination'>
      {showPrev ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadReplies(comment, comment.page - 1)}>prev</button> : null}
      {showNext ? <button type='button' className='btn btn-sm'
        onClick={(e) => onLoadReplies(comment, comment.page + 1)}>next</button> : null}
    </span>
  )
}

const Comment = ({
  comment, state,
  onLoadReplies, onReplyChange, onSendReply, showReplyForm,
  Gravatar, Heading, enabled = true
}) => {
  //
  function _onLoadRepliesClick (e) {
    e.preventDefault()
    onLoadReplies(comment)
  }

  const feedback = <CommentFeedback comment={comment} state={state} />
  const loadreplies = comment.reply_count > 0 && comment.replies === null ? (
    <a href='#' onClick={_onLoadRepliesClick}>
      <i className='fa fa-comments' aria-hidden='true'></i> {comment.reply_count} replies ..
    </a>
  ) : null
  const replyButton = enabled && comment.reply_count === 0 ? (
    <span><button type='button' className='btn btn-primary btn-sm'
      onClick={(e) => showReplyForm()}>reply</button> · </span>
  ) : null

  return (
    <div className='media'>
      <div className='media-left'>
        <Gravatar user={comment.uid} />
      </div>
      <div className='media-body'>
        <span className='media-heading'>
          <Heading record={comment} />
        </span>
        <span dangerouslySetInnerHTML={{__html: comment.content}} />
        <div className='toolbar'>
          <div className='pull-right'>
            <Pagination comment={comment} onLoadReplies={onLoadReplies} />
          </div>
          {replyButton}{feedback} · <span>{comment.created}</span> · {loadreplies}
        </div>
        <div className='replies' style={{clear: 'both'}}>
          {
            comment.replies && comment.replies.map((reply, idx) => {
              return (<Reply key={idx} reply={reply} Gravatar={Gravatar} Heading={Heading} />)
            })
          }
          {
            enabled && comment.reply !== null ? (
              <ReplyForm comment={comment} onChange={onReplyChange}
                onSend={onSendReply} onCancel={showReplyForm} />
            ) : null
          }
        </div>
      </div>
    </div>
  )
}
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
  onLoadReplies: PropTypes.func.isRequired,
  showReplyForm: PropTypes.func.isRequired,
  onReplyChange: PropTypes.func.isRequired,
  onSendReply: PropTypes.func.isRequired,
  Gravatar: PropTypes.func,
  Heading: PropTypes.func
}
export default observer(Comment)

const _CommentFeedback = ({ comment, state }) => {
  return (
    <div className='btn-group commentfeedback' role='group'>
      <button type='button' className='btn btn-sm'
        disabled={comment.feedback && comment.feedback.value === 1}
        onClick={(e) => state.upvote(comment)}>
        {comment.upvotes} <i className='fa fa-thumbs-o-up'></i>
      </button>

      <button type='button' className='btn btn-sm'
        disabled={comment.feedback && comment.feedback.value === -1}
        onClick={(e) => state.downvote(comment)}>
        {comment.downvotes} <i className='fa fa-thumbs-o-down'></i>
      </button>
    </div>
  )
}
const CommentFeedback = observer(_CommentFeedback)

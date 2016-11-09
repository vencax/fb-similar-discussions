import React from 'react'
import { observer } from 'mobx-react'
import Comment from './comment'

@observer
class Discussion extends React.Component {

  static propTypes = {
    discussion: React.PropTypes.object.isRequired,
    state: React.PropTypes.object.isRequired,
    onLoadComments: React.PropTypes.func.isRequired,
    onComment: React.PropTypes.func.isRequired,
    onCommentChange: React.PropTypes.func.isRequired,
    onSendComment: React.PropTypes.func.isRequired,
    onLoadReplies: React.PropTypes.func.isRequired
  }

  renderComments(comments) {
    const comparator = (a, b) => {
      return a.rating < b.rating
    }
    return (
      <div style={{marginLeft: '3em'}}>
        { comments.sort(comparator).map((comment, idx) => (
            <Comment key={idx} comment={comment} state={this.props.state}
              onLoadReplies={this.props.onLoadReplies} />
        )) }
      </div>
    )
  }

  renderCommentForm(discussion) {
    const { onCommentChange, onSendComment } = this.props
    return (
      <div className="commentform">
        <textarea onChange={(e)=>onCommentChange(e.target.value)} value={discussion.comment} />
        <button onClick={(e)=>onSendComment()}>send</button>
      </div>
    )
  }

  render() {
    const { discussion, state, onLoadComments, onComment } = this.props
    const comments = discussion.comments.length ? this.renderComments(discussion.comments) : null
    const loadButton = discussion.comment_count ? (
      <button onClick={(e)=>onLoadComments()}>
        {discussion.comment_count} comments
      </button>
    ) : null
    const commentForm = discussion.comment !== null ?
      this.renderCommentForm(discussion) : null
    const commentButton = (discussion.comment_count === 0 || discussion.comments.length > 0) ?
      (<button onClick={(e)=>onComment()}>comment</button>) : null
    return (
      <div className="discussion">
        <h4>{discussion.title}</h4>
        <p>
          {discussion.created} | {discussion.author} | {loadButton}
        </p>
        <p dangerouslySetInnerHTML={{__html: discussion.body}} />
        {comments}
        {commentForm}
        {commentButton}
      </div>
    )
  }

}
export default Discussion

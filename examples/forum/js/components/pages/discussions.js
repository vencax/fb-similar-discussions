import React from 'react'
import { observer } from 'mobx-react'
import Discussion from 'fb-like-comments/components/discussion'

@observer
class DiscussionsView extends React.Component {

  static propTypes = {
    state: React.PropTypes.object.isRequired
  }

  render() {
    const { state } = this.props
    return state.currentView.discussions.length ? (
      <ul>
        { state.currentView.discussions.map((dis, idx) => {
          return (<li key={idx}>
            <Discussion discussion={dis} state={state}
              onLoadComments={()=>state.loadComments(state.currentView, dis)}
              onComment={()=>state.composeComment(dis)}
              onCommentChange={(newVal)=>state.updateComment(dis, newVal)}
              onSendComment={()=>state.sendComment(dis)} />
          </li>)
        })}
      </ul>
    ) : <span>loading</span>
  }

}
export default DiscussionsView
import {connect} from 'react-redux'
import Login from './login'
import {addSocketAction, addSessionIdAction, updateConnectionAction, verifyAuthAction} from '../../../core/actions/connection'
import {loggedIn} from '../../actions/user'
import {addNodes} from '../../actions/nodes'
import {addIpAction} from '../../../core/actions/user'
import {hasErrorAction} from '../../../core/actions/feedback'
import {receiveMessageAction} from '../../../core/actions/socket'
import { browserHistory } from 'react-router'
const mapStateToProps = (state) => {
  return {
    auth: state.connection.auth,
    status: state.connection.status,
    synced: state.connection.synced,
    user: state.__.user,
    imprintedNodes: state.imprintedNodes,
    socket: state.connection.ws,
    contexts: state.contexts,
    sessionId: state.connection.sessionId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addIp: (data) => {
      dispatch(addIpAction(data))
    },
    addSocket: (socket) => {
      dispatch(addSocketAction(socket))
    },
    verifyAuth: (auth) => {
      dispatch(verifyAuthAction(auth))
    },
    receiveMessage: (msg, req) => {
      dispatch(receiveMessageAction(msg, req))
    },
    addSessionId: (val) => {
      dispatch(addSessionIdAction(val))
    },
    hasError: (status, message, code, title, icon) => {
      dispatch(hasErrorAction(status, message, code, title, icon))
    },
    updateConnectionStatus: (res) => {
      dispatch(updateConnectionAction(res))
    },
    addOrchestratorNode: ({ip, name}) => {
      // debugger
      const node = {
        name,
        xpub: 'default-orchestrator-node',
        isOrchestrator: true,
        endpoint:{
          ip,
          port: 8080,
          protocol: 'http'
        }
      }
      const nodes = [node]
    //  dispatch(addNodes({nodes}))
      dispatch(loggedIn(node))
    },
  }
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    addOrchestratorNode: ({ip, name}) =>{
      if(!stateProps.user) {
        dispatchProps.addOrchestratorNode({ip, name})
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Login)

import React from 'react';
import ChatListComponent from '../chatList/ChatList';
import fire from '../signup/fire';
import styles from './styles';
import { Button, withStyles } from '@material-ui/core';
import ChatViewComponent from '../chatview/chatview';
import ChatTextBoxComponent from '../ChatTextBox/chatTextBox';
import NewChatCompoent from '../newChat/newChat';
import firebase from 'firebase';

class DashboardComponent extends React.Component{
    constructor(){
        super();
        this.state = {
        selectedChat: null,
        email:null,
        newChatFormVisible:false,
        chat :[]
        };
    }

     render(){
         const { classes } = this.props;
         return (
         <div>
         <ChatListComponent history = {this.props.history} newChatBtnFn ={this.newChatBtnClicked} 
        selectChatFn={this.selectChat}
        chat ={this.state.chat}
        userEmail ={this.state.email}
        selectedChatIndex ={this.state.selectedChat}>  </ChatListComponent>
        {
            this.state.newChatFormVisible ?
            null:
        <ChatViewComponent
            user ={this.state.email}
            chat ={this.state.chat[this.state.selectedChat]}></ChatViewComponent>
        }
        {
            this.state.selectedChat !=null && !this.state.newChatFormVisible ?
            <ChatTextBoxComponent messageReadFn ={this.messageRead} submitMessageFn ={this.submitMessage}></ChatTextBoxComponent>:
            null
        }
        {
            this.state.newChatFormVisible ? <NewChatCompoent goToChatFn = {this.goToChat}  newChatSubmitFn={this.newChatSubmit}></NewChatCompoent>:null
        }
        <Button className={classes.signOutBtn} onClick={this.signOut}>Sign Out</Button>
        </div>
            );
     }
     signOut = () => fire.auth().signOut();

     selectChat = async (chatIndex) =>{
       await this.setState({selectedChat:chatIndex});
       this.messageRead();
     }
     submitMessage = (msg) => {
         const dockey = this.buildDockey(this.state.chat[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
         fire
         .firestore()
         .collection('chat')
         .doc(dockey)
         .update({
                messages : firebase.firestore.FieldValue.arrayUnion({
                sender : this.state.email,
                message : msg,
                timestamp : Date.now()

             }),
             receiverHasRead : false
         });
        }

     buildDockey = (friend) =>[this.state.email, friend].sort().join(':');

     newChatBtnClicked = () => this.setState({newChatFormVisible:true ,selectedChat:null});

     messageRead = () => {
         const dockey =this.buildDockey( this.state.chat[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0])
          if(this.ClickedChatWhereNotSender(this.state.selectedChat)){
              fire
              .firestore()
              .collection('chat')
              .doc(dockey)
              .update({receiverHasRead :true})
          }else{
              console.log('Clicked message where user was sender')
          }
     }
     goToChat = async (dockey, msg) =>{
         const userInChat = dockey.split(':');
         const chat = this.state.chat.find(_chat =>userInChat.every(_user => chat.users.includes(_user)));
         this.setState({newChatFormVisible : false});
         await this.selectChat(this.state.chat.indexOf(chat));
         this.submitMessage(msg);
     }
     newChatSubmit = async(chatObj) =>{
         const dockey = this.buildDockey(chatObj.sendTo)
         await fire
         .firestore()
         .collection('chat')
         .doc(dockey)
         .set({
             receiverHasRead:false,
             users :[this.state.email, chatObj.sendTo],
             messages:[{
                 message:chatObj.message,
                 sender:this.state.email
             }]
         })
         this.setState({newChatFormVisible:false});
         this.selectChat(this.state.chat.length - 1);
     }

     ClickedChatWhereNotSender = (chatIndex) => this.state.chat[chatIndex].messages[this.state.chat[chatIndex].messages.length-1].sender !== this.state.email;

     componentDidMount = () =>{
         fire.auth().onAuthStateChanged(async _usr =>{
                if(!_usr){
                    this.props.history.push("./login");
                }else{
                    await fire
                    .firestore()
                    .collection('chat')
                    .where('users','array-contains',_usr.email)
                    .onSnapshot(async res =>{
                        const chat = res.docs.map(_doc => _doc.data());
                        await this.setState({
                          email:_usr.email,
                          chat:chat,
                          friends: []
                        });
                        console.log(this.state)
                    })
                }
         });

     }
}
export default withStyles(styles)(DashboardComponent);
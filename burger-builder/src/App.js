import React, { Component } from 'react';
import './App.css';
import Post from './Post/Post';

class App extends Component {
  state = {
    timer: 1,
    posts: [
      {
        id: '123',
        userName: 'Joe',
        message: 'Test 1',
        title: 'Message #1',
        canEdit: false
      },
      {
        id: '246',
        userName: 'Jack',
        message: 'Test 2',
        title: 'Message #2',
        canEdit: false
      }
    ],
    timerDone: false
  };

  constructor() {
    super();
    console.log('Constructed...');
    this.initiateTimer();
  }

  clickHandler = (index) => {
    console.log('Enabling edit...');
    const post = {
      ...this.state.posts[index]
    }
    post.canEdit = true;
    const posts = this.state.posts.slice();
    posts[index] = post;
    this.setState({
      posts
    });
  }

  changeHandler = (event, id) => {
    const message = event.target.value;
    console.log(this.state.posts);
    const index = this.state.posts.findIndex(p => p.id === id);
    if (index < 0) {
      return;
    }
    const posts = this.state.posts.slice();
    const post = {
      ...this.state.posts[index]
    };
    post.message = message;
    posts[index] = post;
    console.log(`Changing... id=${id}, index=${index}, posts=${JSON.stringify(posts)}`);
    this.setState({
      posts
    });
  }

  doneEditingHandler = (id) => {
    const posts = [...this.state.posts];
    const postIndex = posts.findIndex(p => p.id === id);
    const post = {
      ...posts[postIndex]
    };
    console.log('Calling doneEditingHandler on id='+id, 'index='+postIndex);
    post.canEdit = false;
    posts[postIndex] = post;
    console.log('Here:', JSON.stringify(posts));
    this.setState({
      posts
    });
  }

  initiateTimer(n) {
    const handler = () => {
      console.log('Timer:',this.state.timer);
      if (this.state.timer <= 0) {
        console.log('Stopping interval:', interval);
        this.setState({
          timerDone: true
        });
        clearInterval(interval);
      } else {
        const timer = this.state.timer - 1;
        this.setState({
          timer
        });
      }
    }
    const interval = setInterval(handler, 1000);
  }

  renderPosts = () => {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }
    const posts = this.state.posts;
    return (
      <div className="Posts" style={style}>
          {
            posts.map((post, index) => {
              return (
                <Post
                  key={post.id}
                  id={post.id}
                  userName={post.userName}
                  title={post.userName} 
                  message={post.message}
                  change={(event) => this.changeHandler(event, post.id)}
                  click={() => this.clickHandler(index)}
                  doneEditing={() => this.doneEditingHandler(post.id)}
                  canEdit={post.canEdit}
                />
              );
            }) 
          }
      </div>
    )
  }

  render() {
    const posts = this.state.timerDone ? this.renderPosts() : null;
    return (
      <div> 
        <div className="timer">
          {this.state.timer > 0 ? this.state.timer : 'FINISHED!'}
        </div>
        { posts }
      </div>
    );
  }
}

export default App;

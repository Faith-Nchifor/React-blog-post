import logo from './logo.svg';
import {documentToReactComponents } from '@contentful/rich-text-react-renderer'
import './App.css';
import { useEffect, useState } from 'react';
import Post from './components/post';

function App() {
  const [post,setPost]=useState(null)
  const [body,setBody]=useState({})
  const [loading,setLoading]=useState(false)
  const query =`
  {
    blogPostCollection{
    items{
      postTitle
      postCreationDate
      postImage{
        url
      }
      postBody{
        json
      }
      
    }
    
  }
  }
  `
  
  useEffect(()=>{
    setLoading(true)
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_ID}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        //console.log(data);
     //   let post1=documentToReactComponents(data.blogPostCollection.items[0]);
        setPost(data.blogPostCollection.items[0]);
        
        
      })
      .finally(()=>setLoading(false));
  }, []);
  if(loading){
    return <p className='text-center'>Loading...</p>
  }
  return (
    <div className="App">
     <ul class="nav justify-content-center">
      <li class="nav-item">
        <a class="nav-link active" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/">Posts</a>
      </li>
      
      
    </ul>
      { post!==null && 
     
        <Post title={post.postTitle} img={post.postImage.url} date={post.postCreationDate} body={post.postBody.json}/>
         }
    </div>
  );
}

export default App;

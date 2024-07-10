import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Container, PostCard} from '../Components/index'
import { fetchPosts } from '../Store/postSlice'

export default function Home(){
  // const [posts, setPosts] = useState([])
  const user = useSelector(state => state.auth.userData)
  console.log(user)
  const posts = useSelector(state => state.posts.posts)
  const postStatus = useSelector(state => state.posts.status)

  const dispatch = useDispatch()
  

  useEffect(() => {
    if(postStatus === 'idle' && user) dispatch(fetchPosts())
    
  }, [postStatus, dispatch, user])

  if (posts.length === 0 && !user){
    console.log("no posts from home compo")
    return (
      <div className='py-8'>
        <Container>
          <h1 className='text-center'>No Posts</h1>
        </Container>
      </div>
    )
  }
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts ?.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
            <PostCard 
              //spreading all posts
              {...post}
              />
            </div>
          ))}
        
        </div>
      </Container>
    </div>
  )
}
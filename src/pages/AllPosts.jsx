import React, {useEffect} from 'react'
import {Container, PostCard} from '../Components/index'
import {useSelector, useDispatch} from 'react-redux'
import {fetchPosts} from '../Store/postSlice'

export default function AllPosts(){
  // const [posts, setPosts] = useState([])
  const dispatch = useDispatch()
  
  const postStatus = useSelector(state => state.posts.status)
  console.log(postStatus)
  const userPost = useSelector(state => state.posts.posts)
  console.log(userPost)

  
  useEffect(() => {
  
  /** fetch all posts from service(db_Service)  & then setting     
  documents of post if post = true
  * fetch inside useEffect hook lets to prevent caught in a infinite loop of api calls for get post
  * 
  */
    if(postStatus === 'idle') dispatch(fetchPosts())
   


    // service.getPosts([])
    
    
  }, [postStatus, dispatch])

  

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {userPost ?.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
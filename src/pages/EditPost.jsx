import React, {useState, useEffect} from 'react'
import {Container, PostForm} from '../Components/index'
import {useNavigate, useParams} from 'react-router-dom'
import service from '../Appwrite/dbservice'

export default function EditPost(){
  const [post, setPosts] = useState(null)
  const navigate = useNavigate()
  const {slug} = useParams()

  
  useEffect(() => {
    if (slug){
      service.getPost(slug)
      .then((post) => {
        if (post){
          setPosts(post)
        }
      })
    }else navigate('/')
  }, [slug, navigate])

  return post ? (
    <div className='py-8'>
    <Container>
      <PostForm post={post}/>
    </Container>
    </div>
  ) : null
  
}
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import service from "../Appwrite/dbservice";
import Container from "../Components/container/Container";
import parse from "html-react-parser";
import Button from "../Components/Button";

console.log('hi from post component')

export default function Post() {
  const [post, setPost] = useState(null);
  /** taking slug from param so useParams() */
  const { slug } = useParams();
  console.log(slug)
  const navigate = useNavigate();

  /** checking userData from store  */
  const userData = useSelector((state) => state.auth.userData);
  /** checking if client is the og Author of the post or not */
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  console.log(post)
  
  useEffect(() => {
    if (slug) {
      console.log(slug)
      service.getPost(slug).then((post) => {
        console.log(post)
        if (post) setPost(post)
        else navigate("/");
      });
    }else console.log('Error in post ')
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py=8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img src={service.previewFile(post.featuredImage)} alt={post.title} />
          {isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>

              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">
        {parse(post.content)} 
        </div>
      </Container>
    </div>
  ) : console.log('Error in post compo');
}

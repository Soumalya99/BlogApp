import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import service from "../../Appwrite/dbservice";
import { useNavigate } from "react-router-dom";
import { RTE, Input, Button, Selector } from "../index";
import { useForm } from "react-hook-form";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "active",
      },
    });
React-BlogApp
  const navigate = useNavigate();
  /** Asking for userData */
  const userData = useSelector(state => state.auth.userData);
  /** wrapping data to access userId */
  const wrapDat = userData

  console.log(wrapDat.userData.$id)

  // userData ? userData.$id : console.log('$id not found')

  /** actions on form submit */
  const submit = async (data) => {
    if (post) {
      console.log(data);

      /** if post already exist then update post */
      const file = data.image[0]
        ? await service.uploadFile(data.image[0])
        : null;
      /** if file exist already */
      if (file) {
        service.deleteFile(post.featuredImage);
      }
      console.log(file);

      /** if post exist then update post */
      const dbPost = await service.updatePost(post.$id, {
        //extracting everything from data by ...data and then overwrite featuredImage
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      /*  else we have tpo create a new post **/
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        /** getting file id and store in var */
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(fileId);
        /** creating new post */
        const dbPost = await service.createPost({
          ...data,
          userId: wrapDat.userData.$id,
        });
        console.log(data.content);

        data.content
          ? console.log("data content found")
          : console.log("data content not found");

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  /** slug transformation */
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  /** watching slug */
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      /** name is the one watch is monitoring onn */
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form className="flex flex-wrap" onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 px-2">
        <Input
          label="Title"
          placeholder="Title .."
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Slug .."
          className="mb-4"
          {...register("slug", { required: true })}
          //wirirng up slug onInput with setValues
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          //as we are using hook form we need to pass
          //control so we use control = {control}
          label="Content"
          name="content"
          control={control}
          //getting values of content in this RTE
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image "
          type="file"
          className="mb-4"
          accept="image/jpg, image/png, image/jpeg"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.previewFile(post.featuredImage)}
              alt={post.title}
              className="rounded-xl"
            />
          </div>
        )}

        <Selector
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status")}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-amber-400"}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

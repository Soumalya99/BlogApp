import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="pb-1 ml-1 inline-block">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          /**Showing Editer Tinymce */

          <Editor
            initialValue={defaultValue}
            apiKey={'wodxudi1h58pjssjmct6s6pesgj7qafixl4ige0vl3hih2pt'}
            init={{
              height: 500,
              width: 700,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],

              toolbar:
                "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bulllist numlist outdent indent | link image | code",
            }}
            
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

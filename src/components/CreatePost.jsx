import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import MainContentWrapper from "./MainContentWrapper";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newFiles = Array.from(files);
    const newPreviews = Array.from(previews);

    const [removedFile] = newFiles.splice(result.source.index, 1);
    const [removedPreview] = newPreviews.splice(result.source.index, 1);

    newFiles.splice(result.destination.index, 0, removedFile);
    newPreviews.splice(result.destination.index, 0, removedPreview);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert("Please select at least one media file");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("tags", tags);
      files.forEach((file) => formData.append("media", file));
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post created successfully!");
      setCaption("");
      setTags("");
      setFiles([]);
      setPreviews([]);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContentWrapper>
      <div className="max-w-md mx-auto p-4 bg-white dark:bg-neutral-900 rounded-sm shadow-md ">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Create a Post
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            className="border border-gray-300 dark:border-gray-700 p-2 rounded-sm resize-none bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
            rows="3"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter tags (comma separated)"
            className="border border-gray-300 dark:border-gray-700 p-2 rounded-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded-sm bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 file:mr-4 file:py-1 file:px-2 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 cursor-pointer"
          />

          {previews.length > 0 && (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="media-previews" direction="horizontal">
                {(provided) => (
                  <div
                    className="grid grid-cols-3 gap-1"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {previews.map((src, index) => (
                      <Draggable key={src} draggableId={src} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="relative w-full aspect-square overflow-hidden rounded-sm border border-gray-300 dark:border-gray-700"
                          >
                            {files[index].type.startsWith("image") ? (
                              <img
                                src={src}
                                alt="preview"
                                className="w-full h-full object-cover hover:scale-105 transition duration-200"
                              />
                            ) : (
                              <video
                                src={src}
                                className="w-full h-full object-cover hover:scale-105 transition duration-200"
                                muted
                                loop
                              />
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 dark:bg-blue-600 text-white py-2 rounded-sm hover:bg-blue-600 dark:hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </MainContentWrapper>
  );
};

export default CreatePost;

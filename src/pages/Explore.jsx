import React from "react";
import { Heart, MessageCircle, PlaySquare, Copy } from "lucide-react";
import MainContentWrapper from "../components/MainContentWrapper";

function Explore() {
  const posts = [
    {
      type: "image",
      src: "https://i.pinimg.com/736x/0d/21/17/0d21177daaea06740b9b08bf6039e6d9.jpg",
      likes: "20.6K",
      comments: 407,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/29/3c/91/293c91ea0791d9f366ce5fbb6bb6e9c8.jpg",
      likes: "20.6K",
      comments: 1600,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
      likes: "13.4K",
      comments: 228,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/01/56/f7/0156f75522fe1da14b8659bdb80d1e2b.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/82/b4/e0/82b4e0b917ca847284b7d71f6f06ca96.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/39/74/c639745014959ee6edeb4fc3242779e3.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/0d/21/17/0d21177daaea06740b9b08bf6039e6d9.jpg",
      likes: "20.6K",
      comments: 407,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/29/3c/91/293c91ea0791d9f366ce5fbb6bb6e9c8.jpg",
      likes: "20.6K",
      comments: 1600,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
      likes: "13.4K",
      comments: 228,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/01/56/f7/0156f75522fe1da14b8659bdb80d1e2b.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/82/b4/e0/82b4e0b917ca847284b7d71f6f06ca96.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/39/74/c639745014959ee6edeb4fc3242779e3.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/0d/21/17/0d21177daaea06740b9b08bf6039e6d9.jpg",
      likes: "20.6K",
      comments: 407,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/29/3c/91/293c91ea0791d9f366ce5fbb6bb6e9c8.jpg",
      likes: "20.6K",
      comments: 1600,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
      likes: "13.4K",
      comments: 228,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/01/56/f7/0156f75522fe1da14b8659bdb80d1e2b.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/82/b4/e0/82b4e0b917ca847284b7d71f6f06ca96.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/39/74/c639745014959ee6edeb4fc3242779e3.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/0d/21/17/0d21177daaea06740b9b08bf6039e6d9.jpg",
      likes: "20.6K",
      comments: 407,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/29/3c/91/293c91ea0791d9f366ce5fbb6bb6e9c8.jpg",
      likes: "20.6K",
      comments: 1600,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
      likes: "13.4K",
      comments: 228,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/01/56/f7/0156f75522fe1da14b8659bdb80d1e2b.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/82/b4/e0/82b4e0b917ca847284b7d71f6f06ca96.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/39/74/c639745014959ee6edeb4fc3242779e3.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/0d/21/17/0d21177daaea06740b9b08bf6039e6d9.jpg",
      likes: "20.6K",
      comments: 407,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/29/3c/91/293c91ea0791d9f366ce5fbb6bb6e9c8.jpg",
      likes: "20.6K",
      comments: 1600,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
      likes: "13.4K",
      comments: 228,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/01/56/f7/0156f75522fe1da14b8659bdb80d1e2b.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/82/b4/e0/82b4e0b917ca847284b7d71f6f06ca96.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/39/74/c639745014959ee6edeb4fc3242779e3.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/0d/21/17/0d21177daaea06740b9b08bf6039e6d9.jpg",
      likes: "20.6K",
      comments: 407,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/a7/93/11/a79311b2c07d71dcbd680caa26c160f1.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/29/3c/91/293c91ea0791d9f366ce5fbb6bb6e9c8.jpg",
      likes: "20.6K",
      comments: 1600,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/ef/da/80/efda80d1aefdd638528962aa628d7ad7.jpg",
      likes: "13.4K",
      comments: 228,
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/01/56/f7/0156f75522fe1da14b8659bdb80d1e2b.jpg",
    },
    {
      type: "reel",
      src: "https://i.pinimg.com/736x/82/b4/e0/82b4e0b917ca847284b7d71f6f06ca96.jpg",
    },
    {
      type: "image",
      src: "https://i.pinimg.com/736x/c6/39/74/c639745014959ee6edeb4fc3242779e3.jpg",
    },
  ];
  let tallReelCount = 0;

  return (
    <MainContentWrapper>
      <div
        className="px-10 py-10 grid grid-cols-3 auto-rows-[350px] gap-2"
        style={{ gridAutoFlow: "dense" }}
      >
        {posts.map((post, index) => {
          const isReel = post.type === "reel";
          const isTall = isReel && tallReelCount++ % 2 === 0;

          return (
            <div
              key={index}
              className={`relative group overflow-hidden ${
                isTall ? "row-span-2" : ""
              }`}
            >
              <img
                src={post.src}
                alt={`Post ${index}`}
                className="w-full h-full object-cover hover:brightness-75 transition duration-300"
              />

              {/* Top Left (Reel icon) */}
              {isReel && (
                <PlaySquare className="absolute top-2 left-2 text-white w-5 h-5 drop-shadow-md" />
              )}

              {/* Top Right (Image/Carousel icon) */}
              {!isReel && (
                <Copy className="absolute top-2 right-2 text-white w-4 h-4 drop-shadow-md" />
              )}

              {/* Hover overlay */}
              {(post.likes || post.comments) && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 text-white text-sm">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </div>
                  <div className="flex items-center gap-1 text-white text-sm">
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </MainContentWrapper>
  );
}

export default Explore;

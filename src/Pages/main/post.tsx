import { posts as Iposts } from "./main";
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: Iposts;
}
interface Like {
  userId: string;
  likeId: string;
}

export const Posts = (Props: Props) => {
  const { post } = Props;
  const likesref = collection(database, "likes");
  const [user] = useAuthState(auth);
  const likesdoc = query(likesref, where("postId", "==", post.id));
  const [Likes, setLikes] = useState<Like[] | null>(null);
  const hasuserliked = Likes?.find((like) => like.userId === user?.uid);

  const getlikes = async () => {
    const data = await getDocs(likesdoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newdoc = await addDoc(likesref, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newdoc.id }]
            : [{ userId: user?.uid, likeId: newdoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDltQuery = query(
        likesref,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );
      const liketoDltData = await getDocs(likeToDltQuery);
      const likeId = liketoDltData.docs[0].id;
      const likeToDlt = doc(database, "likes", likeId);
      await deleteDoc(likeToDlt);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getlikes();
  }, []);

  return (
    <div>
      <div className="postusername">
        <p>@{post.username}</p>
      </div>
      <div className="titleOnMain">
        <h1>{post.title}</h1>
      </div>
      <div className="desrciptionOnMain">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        {/* <p>@{post.username}</p> */}
        <button
          onClick={hasuserliked ? removeLike : addLike}
          className="likebtn"
        >
          {hasuserliked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {Likes && <p className="likes">Likes : {Likes?.length}</p>}
      </div>
    </div>
  );
};

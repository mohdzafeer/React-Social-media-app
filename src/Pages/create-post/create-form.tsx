import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, database } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate}from "react-router-dom"

interface createformdata {
  title: string;
  description: string;
}
export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate=useNavigate()

  const schema = yup.object().shape({
    title: yup.string().required("You must Add a Title"),
    description: yup.string().required("You must Add a Description"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createformdata>({
    resolver: yupResolver(schema),
  });

  const postsref = collection(database, "posts");

  const onCreatePost = async (data: createformdata) => {
    await addDoc(postsref,{
    ...data,
        username:user?.displayName,
        userId:user?.uid,
    })
    // console.log(data)
    navigate("/")
  };
  return (
    <div>
        {user?
        <form onSubmit={handleSubmit(onCreatePost)}>
        <div className="entry">
        <input className="title" placeholder="Title..." {...register("title")} />
        <p className="para" style={{ color: "white" }}>{errors.title?.message}</p>
        <input className="description" 
          placeholder="Description..."
          {...register("description")}
        ></input>
        <p className="para" style={{ color: "white" }}>{errors.description?.message}</p>
        </div>
        <input className="submit" type="Submit" />
      </form>:<div className="notlogin">Login to Continue</div>}
    </div>
  );
};

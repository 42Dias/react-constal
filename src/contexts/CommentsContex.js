import { createContext, useState, useEffect, useContext } from "react";
import comentarioCreate from "../services/comentario/comentarioCreate";
import comentarioDelete from "../services/comentario/comentarioDelete";
import comentarioFind from "../services/comentario/comentarioFind";
import comentarioLoad from "../services/comentario/comentarioLoad";
import comentarioUpdate from "../services/comentario/comentarioUpdate";

export const CommentContext = createContext({});

export default function CommentProvider({ children }) {

  async function getComments(){
    try {

      let comentarios = await comentarioLoad()

      setAllComments(comentarios);

      return comentarios
    }
    catch (error) {
      console.log(error);
    }
  };

  const getCommentById = async (id) => {
    try {
      const response = await comentarioFind(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  const createComments = async (data) => {
    try {
      const response = await comentarioCreate(data);
      
      await getComments()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateComment = async (id, data) => {
    try {
      const response = await comentarioUpdate(data, id);
      
      await getComments()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (id) => {
    try {
      const response = await comentarioDelete(id);
      
      await getComments()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const [allComments, setAllComments] = useState(getComments);



  // useEffect(() => {
  //   getComments();
  // }, []);

  return (
    <CommentContext.Provider
      value={{
        allComments,
        setAllComments,
        getComments,
        getCommentById,
        updateComment,
        deleteComment,
        createComments ,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export function useComment() {
  const context = useContext(CommentContext);
  const { allComments, setAllComments, getComments, getCommentById,  createComments ,updateComment, deleteComment, } = context;

  return {
    allComments,
    setAllComments,
    getComments,
    getCommentById,
    createComments ,
    updateComment,
    deleteComment,
  };
}

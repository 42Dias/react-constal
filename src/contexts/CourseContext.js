import { createContext, useState, useEffect, useContext } from "react";
import CourseService from "../services/CourseService";
import cursoCreate from "../services/curso/cursoCreate";
import cursoDelete from "../services/curso/cursoDelete";
import cursoFind from "../services/curso/cursoFind";
import cursoFindWithRelations from "../services/curso/cursoFindWithRelations";
import cursoLoad from "../services/curso/cursoLoad";
import cursoUpdate from "../services/curso/cursoUpdate";
import responseHandler from "../utils/responseHandler";

export const CourseContext = createContext({});

export default function CourseProvider({ children }) {

  async function getCourses(){
    try {

      let cursos = await cursoLoad()

      setAllCourses(cursos);

      return cursos
    }
    catch (error) {
      console.log(error);
    }
  };

  const getCourseById = async (id) => {
    try {
      const response = await cursoFind(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const getCourseByIdWithRelations = async (id) => {
    try {
      const response = await cursoFindWithRelations(id);
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };


  const createCourses = async (data) => {
    try {
      const response = await cursoCreate(data);
      
      await getCourses()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (id, data) => {
    try {
      const response = await cursoUpdate(data, id);

      let mensagemOk = 'Seu produto foi alterado com sucesso! :)'
      let mensagemNaoOK = 'Revise os dados do produto :('
      responseHandler(response, mensagemOk, mensagemNaoOK)
      
      await getCourses()
      
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      const response = await cursoDelete(id);
      
      await getCourses()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };


  const deleteOneCourse = async (id) => {
    try {
      const response = await cursoDelete(id);
      
      await getCourses()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  const [allCourses, setAllCourses] = useState(getCourses);



  // useEffect(() => {
  //   getCourses();
  // }, []);

  return (
    <CourseContext.Provider
      value={{
        allCourses,
        setAllCourses,
        getCourses,
        getCourseById,
        getCourseByIdWithRelations,
        updateCourse,
        deleteCourse,
        createCourses ,
        deleteOneCourse
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  const { allCourses, setAllCourses, getCourses, getCourseById, getCourseByIdWithRelations, createCourses ,updateCourse, deleteCourse, deleteOneCourse } = context;

  return {
    allCourses,
    setAllCourses,
    getCourses,
    getCourseById,
    getCourseByIdWithRelations,
    createCourses ,
    updateCourse,
    deleteCourse,
    deleteOneCourse
  };
}

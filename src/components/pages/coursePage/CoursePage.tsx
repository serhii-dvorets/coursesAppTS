import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../../../api/getCourse";
import { getToken } from "../../../api/getToken";
import { Store } from "../../../utils/storage/store";
import { default as _ReactPlayer } from 'react-player/lazy';
import { ReactPlayerProps } from "react-player/types/lib";
import styles from "./CoursePage.module.scss";
import classnames from "classnames";
import toaster from "../../utils/toast/Toaster";
import { Course } from "../../../assets/types/Course";
import { Lesson } from "../../../assets/types/Lesson";

type ParamsType = {
  courseId: string | undefined
}


export default function CoursePage() {
  const { courseId } = useParams<ParamsType>();
  const { state, dispatch } = useContext(Store);
  const [currentLesson, setCurrentLeson] = useState(0);
  
  const initialData = {
    title: '', 
    lessons: [], 
    description: '', 
  }
  const [courseData, setCourseData] = useState<Course>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      if (!state.token) {
        const tokenData = await getToken();
        await dispatch({
          type: "SET_TOKEN",
          payload: { token: tokenData.token },
        });
      }
      if (state.token && courseId) {
        const coursesData = await getCourse(state.token, courseId);
        setCourseData(coursesData);
      }
    };
    fetchData();
  }, [courseId, dispatch, state]);

  const { title, lessons, description } = courseData;

  const video = lessons?.[currentLesson]?.link || "";

  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

  const chooseLesson = (index: number) => {
    if (courseData?.lessons?.[index].status === "unlocked") {
      setCurrentLeson(index);
    } else {
      return toaster({type: 'info', text: 'This lesson isn\'t avaliable now'});
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.description__container}>
        <div className={styles.description}>
          <h2 className={styles.subTitle}>{description}</h2>
          {lessons.length > 0 && (
            <div className={styles.lessons__container}>
              <h2 className={styles.title}>Lessons:</h2>
              <ul>
                {lessons.map((lesson: Lesson, index: number) => (
                  <li
                    key={lesson.id}
                    className={classnames(`
                      ${
                        lesson.status === "unlocked"
                          ? styles.lesson
                          : styles.lesson__locked
                      }
                      ${currentLesson === index && styles.active}
                    `)}
                    onClick={() => chooseLesson(index)}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <ReactPlayer
          className={styles.player}
          controls={true}
          url={video}
          playing={true}
          width="100%"
          height="auto"
          config={{
            file: {
              forceVideo: true,
            },
          }}
        />
      </div>
    </div>
  );
}

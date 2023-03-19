import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../../api/getCourses";
import { getToken } from "../../../api/getToken";
import { Store } from "../../../utils/storage/store";
import { Pagination } from "antd";
import styles from "./Courses.module.scss";
import CourseItem from "../../utils/courseItem/CourseItem";
import { CourseItemType } from "../../../assets/types/CourseItemType";

export default function CoursesPage() {
  const { state, dispatch } = useContext(Store);
  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!state.token) {
        const tokenData = await getToken();
        dispatch({
          type: "SET_TOKEN",
          payload: { token: tokenData.token },
        });
      }
      if (state.token) {
        const coursesData = await getCourses(state.token);
        setCoursesData(coursesData.courses);
      }
    };
    fetchData();
  }, [dispatch, state]);

  const start = currentPage - 1;
  const limit = 10;
  
  let slicedArray = coursesData.reverse().slice((start * (start ? limit : 0)), (start * limit + limit));

  return (
    <div className={styles.container}>
      <div className={styles.courses__container}>
        {coursesData &&
          slicedArray.map((course: CourseItemType) => (
            <div className={styles.course__container}>
              <Link to={`/course/${course.id}`} key={course.id}>
                <CourseItem data={course} />
              </Link>
            </div>
            ))}
      </div>
      <div className={styles.pagination__container}>
        {coursesData.length > 0 && (
          <Pagination
            current={currentPage}
            onChange={onChange}
            total={coursesData.length}
          />
        )}
      </div>
    </div>
  );
}

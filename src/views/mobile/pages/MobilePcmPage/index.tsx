import { FC } from "react";
import { useParams } from 'react-router-dom';

/**
 * Components
 */

/**
 * Assets
 */
// import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

/**
 * Hooks
 */

export const MobilePcmPage: FC = () => {

  const { id: taskId } = useParams<{ id: string }>()
  console.log({taskId})
  
  return (
    <main className="relative h-full">
      <p >Truy cập App Mobile</p>
    </main>
  )
}
import { FC, useEffect } from "react";
import { useParams } from 'react-router-dom';

export const MobilePcmPage: FC = () => {
  const { id: taskId } = useParams<{ id: string }>()

  useEffect(() => {
    window.open(`trixgo://https://app.trixgo.com/pcm/detail/${taskId}`, '_blank');
  }, [taskId]);
  
  return (
    <main className="relative h-full">
      <p >Truy cập App Mobile</p>
    </main>
  )
}